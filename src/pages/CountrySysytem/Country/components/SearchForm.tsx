import { ProForm, ProFormText } from '@ant-design/pro-components';
// import { Button, Space, message } from 'antd';
// import { useState } from 'react';

const CountrySearchForm = () => {
  return (
    <>
      <ProForm
        layout="vertical" // 关键配置
        onFinish={async (values) => {
          console.log(values);
        }}
        submitter={{
          render: (props, doms) => [
            <div key={'btn'} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{doms}</div>,
          ],
          // 其他配置...
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="country_ch_name"
            label="国家名称(ch)"
            // tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          {/* <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" /> */}
          {/* <ProFormText
            name={['contract', 'name']}
            width="md"
            label="合同名称"
            placeholder="请输入名称"
          /> */}
        </ProForm.Group>
        {/* <ProForm.Group>
          <ProFormDateRangePicker
            width="md"
            name={['contract', 'createTime']}
            label="合同生效时间"
          />
        </ProForm.Group> */}
      </ProForm>
    </>
  );
};

export default CountrySearchForm;
