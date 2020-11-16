import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SCREEN_SIZE from '../../styles/screen-size';
import Card from '../../components/Card';
import CardTitle from '../../atomics/Typography/CardTitle';
import useCountAnimation from '../../animations/useCountAnimation';
import Api from '../../api';

const UmbrellaDashboardList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 2fr 1fr;

  height: calc(100% - (30px + 1.8rem));

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    grid-template-rows: 1fr;
  }
`;

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UmbrellaDashboardTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const UmbrellaDashboardContent = styled.p`
  text-align: center;
  font-weight: lighter;
`;

const StyledEmoji = styled.span`
  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: none;
  }
`;

const UmbrellaNotice = styled.p`
  grid-column: 1 / 4;
  grid-row: 2 / 3;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${SCREEN_SIZE.SCREEN_TABLET}) {
    display: none;
  }
`;

interface UmbrellaDashboardCardState {
  readonly leftUmbrella: number;
  readonly borrowUmbrella: number;
  readonly expiryUmbrella: number;
}

const UmbrellaDashboardCard: React.FC = () => {
  const [dataLength, setDataLength] = useState<UmbrellaDashboardCardState>({
    leftUmbrella: 0,
    borrowUmbrella: 0,
    expiryUmbrella: 0
  });

  useEffect(() => {
    Api.get('/umbrella?rental=false')
      .then((res) => {
        setDataLength((current) => ({
          ...current,
          leftUmbrella: res.data.data.length
        }));

        return Api.get('/umbrella?rental=true');
      })
      .then((res) => {
        setDataLength((current) => ({
          ...current,
          borrowUmbrella: res.data.data.length
        }));

        return Api.get('/umbrella/expiry');
      })
      .then((res) => {
        setDataLength((current) => ({
          ...current,
          expiryUmbrella: res.data.data.length
        }));
      });
  }, []);

  const nodeRef1 = useRef<HTMLParagraphElement>(null);
  const nodeRef2 = useRef<HTMLParagraphElement>(null);
  const nodeRef3 = useRef<HTMLParagraphElement>(null);

  useCountAnimation(nodeRef1, 0, dataLength.leftUmbrella);
  useCountAnimation(nodeRef2, 0, dataLength.borrowUmbrella);
  useCountAnimation(nodeRef3, 0, dataLength.expiryUmbrella);

  /* eslint-disable jsx-a11y/accessible-emoji */

  return (
    <Card columnStart={1} columnEnd={3} rowStart={1} rowEnd={2}>
      <CardTitle>우산 대여 현황</CardTitle>

      <UmbrellaDashboardList>
        <DashboardWrapper>
          <div>
            <UmbrellaDashboardTitle>
              <StyledEmoji role="img" aria-label="umbrella">
                🌂
              </StyledEmoji>
              남은 우산
            </UmbrellaDashboardTitle>
            <UmbrellaDashboardContent>
              <span ref={nodeRef1}>000</span>
              <span>개</span>
            </UmbrellaDashboardContent>
          </div>
        </DashboardWrapper>

        <DashboardWrapper>
          <div>
            <UmbrellaDashboardTitle>
              <StyledEmoji role="img" aria-label="water drop">
                💧
              </StyledEmoji>
              빌린 우산
            </UmbrellaDashboardTitle>
            <UmbrellaDashboardContent>
              <span ref={nodeRef2}>000</span>
              <span>개</span>
            </UmbrellaDashboardContent>
          </div>
        </DashboardWrapper>

        <DashboardWrapper>
          <div>
            <UmbrellaDashboardTitle>
              <StyledEmoji role="img" aria-label="warning">
                🚨
              </StyledEmoji>
              연체 우산
            </UmbrellaDashboardTitle>
            <UmbrellaDashboardContent>
              <span ref={nodeRef3}>000</span>
              <span>개</span>
            </UmbrellaDashboardContent>
          </div>
        </DashboardWrapper>

        <UmbrellaNotice>
          {dataLength.expiryUmbrella > 10 ? '연체된 우산이 너무 많아요!' : ''}
        </UmbrellaNotice>
      </UmbrellaDashboardList>
    </Card>
  );
};

export default UmbrellaDashboardCard;
