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
import React from 'react';
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


const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});


const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];


const { RangePicker } = DatePicker;

const Home = () => (
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
            <Input.Search size="large" placeholder="De donde viajas?" />
          </AutoComplete>

          <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{
              width: 250,
            }}
            options={options} >
            <Input.Search size="large" placeholder="A donde vas?" />
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
);

export default Home;
