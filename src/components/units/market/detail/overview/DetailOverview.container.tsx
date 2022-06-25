import { HeartOutlineRedIcon, ShareIcon } from 'assets/svgs';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import * as S from './DetailOverview.styles';
import Title01 from 'components/commons/text/title/Title01';
import { IMarketDetail } from '../MarketDetail.types';
import { v4 as uuid4 } from 'uuid';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import { getAvgStar } from 'commons/utils/getStars';
import { getMoney, getPercent } from 'commons/utils/getAmount';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import logo from '../../../../../assets/svgs/logo/logo-icon-w.svg';
import Dropdown05 from 'components/commons/dropdown/05/Dropdown05';
import store from 'storejs';
import { IMarketList } from '../../list/MarketList.types';
import { useNavigate, useParams } from 'react-router-dom';

interface IDetailOverviewProps {
  detailData?: IMarketDetail;
}

export default function DetailOverview(props: IDetailOverviewProps) {
  const [image, setImage] = useState('');
  const accessToken = store.get('accessToken');
  const [myListData, setMyListData] = useState<IMarketList[]>();
  const [likeActive, setLikeActive] = useState<boolean>();
  const navigate = useNavigate();
  const { id } = useParams();

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const deleteMarketItem = async () => {
    await axios
      .delete(`https://earth-mas.shop/server/market/${props.detailData?.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const findLike = () => {
  //   if (props.detailData && myListData) {
  //     for (let i = 0; i < myListData.length; i++) {
  //       if (props.detailData.id === myListData[i].id) {
  //         return setLikeActive(true);
  //       }
  //       return setLikeActive(false);
  //     }
  //   }
  // };

  const getItemsMyLike = async () => {
    const findLike = () => {
      if (props.detailData && myListData) {
        for (let i = 0; i < myListData.length; i++) {
          if (props.detailData.id === myListData[i].id) {
            setLikeActive(true);
            // alert('찜한 상품');
          }
        }
        setLikeActive(false);
        // alert('찜 안함');
      }
      // console.log(likeActive);
    };
    await axios
      .get(`https://earth-mas.shop/server/market/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        // console.log('like Data :', res.data);
        setMyListData(res.data);
        findLike();
        // console.log(likeActive);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickPostLike = async () => {
    const variables = {
      id: props.detailData?.id,
    };
    // console.log(variables);
    await axios
      .post(`https://earth-mas.shop/server/market/like`, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        alert('찜');
        console.log(res);
        // if (res.data.isLike = true)
        setLikeActive(res.data.isLike ? true : false);
        // location.reload();
      })
      .catch(error => {
        console.log(error);
        alert('로그인이 필요한 서비스입니다');
      });
  };

  useEffect(() => {
    setImage(`${props.detailData?.url.split(',')[0]}`);
    getItemsMyLike();
  }, [props.detailData]);

  useEffect(() => {
    getItemsMyLike();
  }, []);

  return (
    <main>
      <S.ItemImage>
        <div className="cover-image-list">
          <ul>
            {props.detailData?.url.split(',').map(el => (
              <li key={uuid4()}>
                <img
                  src={el}
                  onMouseOver={() => {
                    setImage(el);
                  }}
                  onError={onErrorImg}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="cover-image">
          <div>
            <img src={image} onError={onErrorImg} />
          </div>
        </div>
      </S.ItemImage>
      <S.ItemInfo>
        <div className="title-wrap">
          <Title01 size="C" content={props.detailData?.title} margin={15} />
          <Dropdown05
            page="market"
            deleteContent={deleteMarketItem}
            title="게시물을 삭제하시겠습니까?"
            contents="삭제 후 되돌릴 수 없습니다"
            cancelMessage="취소"
            okMessage="삭제"
          />
        </div>
        <p className="description">{props.detailData?.minidescription}</p>
        <div className="review">
          <ViewStars
            contained={
              props.detailData?.reviewscore &&
              getAvgStar(
                props.detailData?.reviewscore,
                props.detailData?.reviewpeople,
              )
            }
            color="main"
          />
          <span>{props.detailData?.reviewpeople}개의 리뷰</span>
        </div>
        <p className="price">
          <span className="price-discount-rate">
            {getPercent(props.detailData?.amount, props.detailData?.discount)}%
          </span>
          <span className="price-discount">
            {getMoney(props.detailData?.discount)}원
          </span>
          <span className="price-origin">
            {getMoney(props.detailData?.amount)}원
          </span>
        </p>
        <div className="delivery">
          <div className="delivery-title">
            <span>배송</span>
          </div>
          <ul className="delivery-content">
            <li>택배배송 | 3,000원 (주문시 결제)</li>
            <li>배송지는 개인정보 입력하신 주소로 설정됩니다.</li>
          </ul>
        </div>
        <hr />
        <div className="pay">
          <span className="pay-title">총 결제금액</span>
          <span className="pay-content">
            {(Number(props.detailData?.discount) + 3000).toLocaleString()}원
          </span>
        </div>
        <div className="buttons">
          <ContainedButton01
            color="main"
            content="구매하기"
            onClick={() => {
              navigate(`/market/${id}/payment`);
            }}
          />
          <div className="button-wrap">
            <OutlinedButton01
              color="main"
              onClick={onClickPostLike}
              content={
                likeActive ? (
                  <HeartOutlineRedIcon />
                ) : (
                  <HeartOutlineRedIcon fill="#D92828" />
                )
              }
            />
            <OutlinedButton01 color="main" content={<ShareIcon />} />
          </div>
        </div>
      </S.ItemInfo>
    </main>
  );
}
