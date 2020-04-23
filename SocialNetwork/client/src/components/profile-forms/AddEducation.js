import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';
import {Form, PageHeader, Icon, Input, Checkbox, Button, DatePicker, Switch} from "antd";
// import Education from '../../img/education.svg'
import { FaGraduationCap, FaBuilding } from 'react-icons/fa';

const { RangePicker } = DatePicker;

const FormItem = Form.Item

const AddEducation = ({addEducation, history}) => {
  const [form] = Form.useForm();
  
  const [toDateDisabled, toggleDisabled] = useState(false);
  
  const onSubmit = (values) =>{
    addEducation(values, history);
  }
  
  
  const change = (val)=>{
    toggleDisabled(val)
    console.log(val);
  }
  
  return (
    <Fragment>
      <PageHeader
        ghost={false}
        title="Your Education"
      >
      </PageHeader>
      
      
      
      <PageHeader
        ghost={false}
        title="Add Your Education"
        subTitle={
          <span><FaGraduationCap /> Add any school that you
        have attended</span>
        }
      >
      </PageHeader>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} form={form}
            name="control-hooks" onFinish={onSubmit} scrollToFirstError>
        <Form.Item name="school" label="School" rules={[{ required: true }]}>
          <Input placeholder="School or Bootcamp" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="degree" label="Degree" rules={[{ required: true }]}>
          <Input placeholder="Degree or Certificate" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="fieldofstudy" label="Field of Study" rules={[{ required: true }]}>
          <Input placeholder="Field of Study" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="from" label="From Date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD"/>
        </Form.Item>
        <Form.Item name="current" label="Current School">
          <Switch onChange={change}/>
        </Form.Item>
        <Form.Item name="to" label="To Date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" disabled={toDateDisabled}/>
        </Form.Item>
        <FormItem name="description" label="Description">
          <Input.TextArea placeholder='Program Description'
                          autoSize={{minRows: 3, maxRows: 6}}/>
        </FormItem>
      
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  {addEducation}
)(withRouter(AddEducation));
