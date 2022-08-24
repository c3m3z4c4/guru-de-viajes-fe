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


  let options = location.map((elem) => (
    {
     options: [renderItem(elem.code, elem.city )],
    }
  ))

  
  useEffect(() => {
    console.log(`Sale desde ${departure}`);
    console.log(destination)
},[destination])


  useEffect(() => {
    instance.get('/')
      .then((response) => {
        let data = response.data.filteredAirports
        setLocation([...data])
      })
      .catch((error) => {
        console.error(error)
      })
   
  },[]);
 console.log(location)
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
              <Space direction="vertical" size={12}>
                <RangePicker />
              </Space>
            </div>
            <div>
              <Space direction="horizontal">

                <InputNumber addonBefore="Adultos" defaultValue={1} />
                <InputNumber addonBefore="Ninos" defaultValue={0} />
              </Space>
            </div>
          </Space>
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
