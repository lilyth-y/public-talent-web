export default function AboutLocation() {
  const hsMain = 'https://www.hs.ac.kr';
  const address = '경기도 오산시 한신대길 95';
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent('한신대학교 오산')}`;
  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent('한신대학교 경기도 오산시 한신대길 95')}`;

  return (
    <div className="about-content location-content">
      <section aria-labelledby="location-heading">
        <h2 id="location-heading">찾아오시는 길</h2>
        <div className="location-info">
          <p><strong>한신대학교</strong></p>
          <p>{address} (세교동)</p>
          <p className="text-muted">
            대중교통 및 자세한 안내는{' '}
            <a href={hsMain} target="_blank" rel="noopener noreferrer">
              한신대학교 홈페이지
            </a>
            의 오시는 길을 참고해 주세요.
          </p>
        </div>
        <div className="location-links">
          <p><strong>지도 보기</strong></p>
          <ul>
            <li>
              <a href={naverMapUrl} target="_blank" rel="noopener noreferrer">
                네이버 지도에서 보기
              </a>
            </li>
            <li>
              <a href={kakaoMapUrl} target="_blank" rel="noopener noreferrer">
                카카오맵에서 보기
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
