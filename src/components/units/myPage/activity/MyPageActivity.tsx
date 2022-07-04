import { useEffect, useState } from 'react';

import ActivityCard from 'components/commons/card/activity/ActivityCard';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { MyActivityWrapper } from './MyPageActivity.styles';
import { ActivityIcon } from 'assets/svgs';
import { IActivityListProps } from 'components/units/activity/list/ActivityList.types';

export default function MyPageActivity() {
  const [listData, setListData] = useState<IActivityListProps[]>([]);

  useEffect(() => {
    axiosApiInstance
      .post('/mypage/myactivity', null)
      .then(res => setListData(res.data));
  }, []);

  return (
    <MyActivityWrapper>
      <div className="title">
        <ActivityIcon />
        <h1>나의 액티비티</h1>
      </div>
      <div className="contentWrapper">
        {listData.length === 0 ? (
          <div>등록한 액티비티가 없습니다.</div>
        ) : (
          <div className="list">
            {listData?.map((el: IActivityListProps) => (
              <ActivityCard el={el} />
            ))}
          </div>
        )}
      </div>
    </MyActivityWrapper>
  );
}
