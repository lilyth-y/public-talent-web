import { Link } from 'react-router-dom';
import './FacultyCard.css';

export default function FacultyCard({ name, title, email, research, image, to }) {
  const content = (
    <>
      <div className="faculty-card-inner">
        {image ? (
          <div className="faculty-image" role="img" aria-label={`${name} 교수님 사진`}>
            <img src={image} alt="" />
          </div>
        ) : (
          <div className="faculty-image faculty-image-placeholder" aria-hidden="true">
            <span>사진</span>
          </div>
        )}
        <div className="faculty-info">
          <h3 className="faculty-name">{name}</h3>
          <p className="faculty-title">{title}</p>
          {email && !to && (
            <p className="faculty-email">
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}
          {research && <p className="faculty-research">{research}</p>}
        </div>
      </div>
    </>
  );

  return (
    <article className="faculty-card">
      {to ? (
        <Link to={to} className="faculty-card-link">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}
