import {
  Breadcrumb,
  Layout,
  Menu,
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  Select,
  Space,
  InputNumber,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import {instance} from '../../utils'
const { Header, Content, Footer } = Layout;


const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: 'right',
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);


const renderItem = (code, city) => ({
  value: code,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    > <strong>
        {city}
      </strong>
      <span>
       {code}
      </span>
    </div>
  ),
});




const { RangePicker } = DatePicker;

const Home = () => {
  const [location, setLocation] = useState([]);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({})
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);


  let options = location.map((elem) => (
    {
     options: [renderItem(elem.code, elem.city )],
    }
  ))

  
  useEffect(() => {
    console.log(`Sale desde ${departure}`);
    console.log(destination)
    console.log('Aqui van las fechas', dates)
    console.log(adults)
    console.log(children)
},[destination,dates, adults, children])


  useEffect(() => {
    instance.get('/')
      .then((response) => {
        let data = response.data.filteredAirports
        setLocation([...data])
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
  ].join('-');
  }
  

  const handleDates = (ev) => {
    if (ev[0] !== null && ev[1] !== null ) {
      setDates({
        'departureDate': formatDate(ev[0]._d),
        'returnDate': formatDate(ev[1]._d)
      })
    }
  }


  const handleClick = () => {
    let object = {
      originLocationCode: departure,
      destinationLocationCode: destination,
      departureDate: dates.departureDate,
      returnDate: dates.returnDate,
      adults: adults,
      children: children,
    }

    console.log(object)
    instance.post('/form', object)
    .then((response)=>{console.log(response)})
    .catch((error)=>{console.error(error)})
  }
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }
      
      
          }
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Space direction="vertical">
            <Space direction="horizontal">
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{
                  width: 250,
                }}
                options={options} >
                <Input.Search size="large" placeholder="De donde viajas?" onSelect={(event) => {
                  setDeparture(event.target.value)
                }} />
              </AutoComplete>

              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{
                  width: 250,
                }}
                options={options} >
                <Input.Search size="large" placeholder="A donde vas?" onSelect={(event) => {
                  setDestination(event.target.value)
                }}  />
              </AutoComplete>
            </Space>
            <div>
              <Space direction="vertical" size={12}
                  style={{
                    width: '100%',
                  }} >
                <RangePicker allowEmpty={[false, true]}
                      style={{
                  width: '100%',
                  }}
                  onCalendarChange={(event) => {
                    handleDates(event)
                  }}  
                />
              </Space>
            </div>
            <div>
              <Space direction="horizontal">

                <InputNumber addonBefore="Adultos" defaultValue={1} min={1} max={10}
                onChange={(item) => {
                  setAdults(item)
                }}
                />
                <InputNumber addonBefore="Ninos" defaultValue={0} min={0} max={10}
                onChange={(item) => {
                  setChildren(item)
                }}
                />
              </Space>
            </div>
          </Space>
            <div style={{marginTop:10}}>
            <Button type="primary" ghost onClick={() => handleClick()}>
                Search Results
              </Button>
            </div>
        </div>

      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
};

export default Home;
