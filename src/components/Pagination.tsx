import React from 'react';
import classNames from 'classnames';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface IProps {
  totalPages: number;
  onChangePage: (num: number) => void;
  activePage: number;
  setActivePage: (_: number) => void;
  countPerPage: number;
}

const makeArray = (start: number, end: number) => {
  const arr = [];
  for (let index = 0; index <= end - start; index++) {
    arr[index] = index + start;
  }
  return arr;
}

export default function Pagination({
  totalPages,
  onChangePage,
  activePage = 1,
  setActivePage,
  countPerPage = 10
}: IProps) {
  const [pageList, setPageList] = React.useState<number[]>([]); // 화면상에 보여지는 페이지 리스트
  const [left, setLeft] = React.useState(false); // <
  const [left2, setLeft2] = React.useState(false); // <<
  const [right, setRight] = React.useState(false); // >
  const [right2, setRight2] = React.useState(false); // >>

  const clickLeft2 = () => {
    // 제일 첫번째로 이동
    // setActivePage(1);
    onChangePage(1);
  }
  const clickLeft = () => {
    // group 내의 마지막으로 이동
    const pageGroupNum = Math.floor((activePage - 1) / (countPerPage));
    setActivePage((pageGroupNum - 1) * countPerPage + countPerPage);
    onChangePage((pageGroupNum - 1) * countPerPage + countPerPage);
  }
  const clickRight = () => {
    // group 내의 첫번째로 이동
    const pageGroupNum = Math.floor((activePage - 1) / (countPerPage));
    setActivePage((pageGroupNum + 1) * countPerPage + 1);
    onChangePage((pageGroupNum + 1) * countPerPage + 1);
  }
  const clickRight2 = () => {
    // 제일 마지막으로 이동
    setActivePage(totalPages);
    onChangePage(totalPages);
  }
  React.useEffect(() => {
    const pageGroupNum = Math.floor((activePage - 1) / (countPerPage));
    let start = pageGroupNum * countPerPage + 1;
    let end = start + (countPerPage - 1);

    // 마지막 페이지그룹
    const totalPageGroupNum = Math.floor((totalPages - 1) / (countPerPage));
    if (pageGroupNum === totalPageGroupNum) {
      end = totalPages;
    }
    setPageList(makeArray(start, end));

    // 좌우 화살표 정의
    setLeft(pageGroupNum !== 0);
    setRight(pageGroupNum !== totalPageGroupNum);
    setLeft2(activePage !== 1);
    setRight2(activePage !== totalPages);
  }, [activePage, totalPages]);

  if (totalPages < 1) return <></>
  return (
    <div className="pagination">
      <div className="pagination-button" onClick={left2 ? clickLeft2 : () => {}} style={{cursor: left2 ? 'pointer' : ''}}>{ left2 ? <ChevronDoubleLeft size="16" color="black" /> : <ChevronDoubleLeft size="20" color="lightgray"/>}</div>
      <div className="pagination-button" onClick={left ? clickLeft : () => {}} style={{cursor: left ? 'pointer' : ''}}>{ left ? <ChevronLeft size="16" color="black" /> : <ChevronLeft size="20" color="lightgray"/>}</div>
      {
        pageList && pageList.map((num: number, index: number) => {
          return (
            <div key={index} className={classNames('pagination-item', {active: num === activePage})} onClick={() => {
              if (num === activePage) return;
              setActivePage(num);
              onChangePage(num);
            }}>{num}</div>
          )
        })
      }
      <div className="pagination-button" onClick={right ? clickRight : () => {}} style={{cursor: right ? 'pointer' : ''}}>{ right ? <ChevronRight size="16" color="black" /> : <ChevronRight size="20" color="lightgray"/>}</div>
      <div className="pagination-button" onClick={right2 ? clickRight2 : () => {}} style={{cursor: right2 ? 'pointer' : ''}}>{ right2 ? <ChevronDoubleRight size="16" color="black" /> : <ChevronDoubleRight size="20" color="lightgray"/>}</div>
    </div>
  )
}