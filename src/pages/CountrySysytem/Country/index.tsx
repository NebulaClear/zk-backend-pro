import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import CountrySearchForm from './components/SearchForm';

interface CountryItem {
  country_id: string;
  country_en_name: string;
  country_ch_name: string;
  country_logo: string;
  country_capital: string;
  country_population: number;
  country_area: string;
  country_climate: string;
  country_government_type: string;
  country_safety_rating: number;
  languages: Array<{
    language_id: string;
    is_official: boolean;
  }>;
  currencies: Array<{
    currency_code: string;
    is_primary: boolean;
  }>;
}

const Country: React.FC = () => {
  // const { token } = theme.useToken();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.country);
  const intl = useIntl();
  useEffect(() => {
    dispatch({
      type: 'country/fetchCountryList',
      payload: { page: 1, pageSize: 10 },
    });
  }, []);
   const handleEdit = (record: CountryItem) => {
    // 打开编辑模态框逻辑
    console.log('Edit record:', record);
  };

  const handleDelete = (record:CountryItem) => {
    // Modal.confirm({
    //   title: intl.formatMessage({ id: 'delete.confirm.title' }),
    //   content: intl.formatMessage({ id: 'delete.confirm.content' }),
    //   okText: intl.formatMessage({ id: 'button.confirm' }),
    //   cancelText: intl.formatMessage({ id: 'button.cancel' }),
    //   okType: 'danger',
    //   onOk: async () => {
    //     try {
    //       await deleteCountry(id);
    //       message.success(intl.formatMessage({ id: 'message.delete.success' }));
    //       action?.reload(); // 刷新表格数据
    //     } catch (error) {
    //       message.error(intl.formatMessage({ id: 'message.delete.error' }));
    //     }
    //   },
    // });
    console.log('del record:', record);
  };

  // 列配置
  const columns: ProColumns<CountryItem>[] = [
    {
      title: intl.formatMessage({ id: 'country.flag' }),
      dataIndex: 'country_logo',
      valueType: 'image',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'country.name' }),
      // search: false,
      render: (_, record) => (
        <div>
          <div>{record.country_ch_name}</div>
          <div style={{ color: '#999' }}>{record.country_en_name}</div>
        </div>
      ),
      width: 200,
    },
    {
      title: intl.formatMessage({ id: 'country.capital' }),
      dataIndex: 'country_capital',
      search: false,
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'country.population' }),
      dataIndex: 'country_population',
      search: false,
      // valueType: 'digit',
      sorter: true,
      render: (val) => `${Number(val)}`,
    },
    {
      title: intl.formatMessage({ id: 'country.area' }),
      dataIndex: 'country_area',
      render: (val) => `${val} km²`,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'country.climate' }),
      search: false,
      dataIndex: 'country_climate',
      render: (val, _, index) => (
        <Tag color="geekblue" key={index}>
          {val}
        </Tag>
      ),
    },
    {
      title: intl.formatMessage({ id: 'country.government' }),
      dataIndex: 'country_government_type',
      search: false,
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'country.safety' }),
      dataIndex: 'country_safety_rating',
      search: false,
      render: (val) => (
        <div style={{ display: 'flex', gap: 4 }}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < Number(val) ? '#ffc53d' : '#d9d9d9',
                  fontSize: 18,
                }}
              >
                ★
              </span>
            ))}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'country.languages' }),
      render: (_, record) => (
        <div>
          {record.languages.map((lang) => (
            <Tag key={lang.language_id} color={lang.is_official ? 'gold' : 'default'}>
              {lang.language_id.toUpperCase()}
            </Tag>
          ))}
        </div>
      ),
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'country.currency' }),
      render: (_, record) => (
        <div>
          {record.currencies.map((curr) => (
            <Tag key={curr.currency_code} color={curr.is_primary ? 'green' : 'default'}>
              {curr.currency_code}
            </Tag>
          ))}
        </div>
      ),
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'table.actions' }),
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          <EditOutlined /> {intl.formatMessage({ id: 'button.edit' })}
        </a>,
        <a
          key="delete"
          style={{ color: '#ff4d4f' }}
          onClick={() => handleDelete(record)}
        >
          <DeleteOutlined /> {intl.formatMessage({ id: 'button.delete' })}
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Card style={{ marginBottom: '20px' }}>
        {/* <Button type="primary" loading={loading} onClick={() => getCountryList()}>
          获取国家列表
        </Button> */}
        <CountrySearchForm />
      </Card>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <ProTable<CountryItem, { keyword?: string }>
            rowKey="country_id"
            columns={columns}
            dataSource={list.data || []}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
            }}
            // search={{
            //   labelWidth: 'auto',
            //   optionRender: (searchConfig, props, dom) => [
            //     ...dom,
            //     <Button key="export">导出数据</Button>,
            //   ],
            // }}
            loading={loading}
            search={false}
            scroll={{ x: 'max-content' }}
            bordered
            headerTitle={intl.formatMessage({ id: 'country.list.title' })}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Country;
