import { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './MarketDetail.styles';
import { IMarketDetail } from './MarketDetail.types';
import Title01 from 'components/commons/text/title/Title01';
import DetailOverview from './overview/DetailOverview.container';
import DetailContent from './content/DetailContent.container';
import DetailDelivery from './delivery/DetailDelivery.container';
import ReviewList from '../review/list/ReviewList.container';
import { useQuery } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function MarketDetail() {
  const { id } = useParams();
  const [nowTab, setNowTab] = useState('content');

  const onClickTab = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setNowTab(target.id);
  };

  const { data: detailData } = useQuery<IMarketDetail>(
    ['getItem'],
    async () => {
      const result = await axiosApiInstance.get(`${marketRoute}/${id}`);
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const tabMenu = [
    { id: 'content', name: '상세정보' },
    { id: 'review', name: `리뷰 (${detailData?.reviewpeople})` },
    { id: 'delivery', name: '배송 및 교환' },
  ];
  return (
    <S.Wrap>
      <nav>
        <Title01
          content={`마켓 > ${detailData?.marketcategory?.name}`}
          margin={35}
          size="C"
        />
      </nav>
      <DetailOverview detailData={detailData} />
      <nav className="tab-nav">
        <ul>
          {tabMenu.map(el => (
            <li key={el.id}>
              <span
                id={el.id}
                onClick={onClickTab}
                className={nowTab === `${el.id}` ? 'active' : ''}
              >
                {el.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      {nowTab === 'content' && (
        <DetailContent description={detailData?.description} />
      )}
      {nowTab === 'review' && <ReviewList detailData={detailData} />}
      {nowTab === 'delivery' && <DetailDelivery />}
    </S.Wrap>
  );
}
