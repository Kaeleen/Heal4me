import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getImages, getRecommendation, getGrade} from '../../actions/home';
import PostItem from '../posts/PostItem';
import Gallery from "react-photo-gallery";
import {Alert, Spin, message} from "antd";
import {SyncOutlined,UserOutlined, MailOutlined,LockOutlined } from '@ant-design/icons'


const OtherResources = ({getRecommendation, recommendation: {recommendation}}) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const [loadingRec, setLoadingRec] = useState(true);
  const [imgs, setImgs] = useState([]);
  const [refresh, setRefresh] = useState('');
  const [offset, setoffset] = useState(15);
  useEffect(() => {
    fetchRecommendation({offset})
  }, [getRecommendation]);
  
  const openImageBox = (evt, obj)=>{
    window.open(obj.photo.hostpageurl, '_blank')
  }
  
  const fetchRecommendation = ()=>{
    setRefresh('recommendation')
    getImages({offset: offset + 15}).then((res)=>{
      setoffset(offset + 15)
      const searchImgs = res.data.map(v=>{
        return {
          src: v.thumbnailUrl,
          width: 0.5,
          height: 0.5,
          hostpageurl: v.hostPageUrl
        }
      })
      setImgs(searchImgs)
      message.success('fetch Recommendation successfully!')
    }).catch(()=>{
      message.error('fetch Recommendatio failed!')
    }).finally(()=>{
      setLoadingImg(false)
      setRefresh('')
    });
  }
  
  
  return  (
    <Fragment>
      {
        <div>
          <div className="gallery">
            <div className="gallery-content">
              <Alert message={
                <div style={{display: 'flex'}}>
                  Recommendation
                  <SyncOutlined spin={refresh === 'recommendation'} className="refresh" style={{  }}
                                onClick={fetchRecommendation}/>
                </div>
              }/>
              {loadingImg && <Spin size={"large"}/>}
              {!loadingImg &&
              <Gallery photos={imgs} onClick={openImageBox}/>}
            </div>
          </div>
        </div>
      }
    
    </Fragment>
  );
};

OtherResources.propTypes = {
  getRecommendation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recommendation: state.home
});

export default connect(mapStateToProps, {getRecommendation})(OtherResources);
