'use client';

import { useNoticeStore } from '@/store/noticeStore';
import './PreviewCanvas.css';

export default function PreviewCanvas() {
  const { notice } = useNoticeStore();

  const previewStyle = {
    '--font-family': notice.styles?.font || 'Noto Serif',
    '--font-size': notice.styles?.fontSize || '14px',
  };

  return (
    <div
      id="notice-preview"
      className="a4-print-safe"
      style={previewStyle}
    >
      {/* Logo & Header */}
      <div className="header-row">
        {notice.logo && (
          <div className="logo-container">
            <img src={notice.logo} alt="Logo" className="logo" />
          </div>
        )}

        <div className="org-info">
          <h1 className="org-name">{notice.orgName || 'Organization Name'}</h1>
          {notice.branch && <p className="branch-name">{notice.branch}</p>}
          <p className="notice-date">Date: {notice.date ? new Date(notice.date).toLocaleDateString('en-GB') : 'DD/MM/YYYY'}</p>
        </div>

        <div className="spacer"></div>
      </div>

      <hr className="divider" />

      <h2 className="notice-title">{notice.title || 'Notice Title'}</h2>

      <div className="content-blocks">
        {notice.blocks.map((block, i) => {
          if (block.type === 'formal') {
            return <p key={i} className="formal-text">{block.content || 'Enter formal message...'}</p>;
          }

          if (block.type === 'bullet') {
            return (
              <ul key={i} className="bullet-list">
                {block.items.filter(item => item.trim()).map((item, j) => (
                  <li key={j} className="bullet-item">{item}</li>
                ))}
              </ul>
            );
          }

          if (block.type === 'links') {
            return (
              <div key={i} className="links-block">
                {block.items.filter(item => item.title || item.url).map((link, j) => (
                  <div key={j} className="link-item">
                    <strong>{link.title || 'Link'}:</strong>{' '}
                    <span className="link-url">{link.url}</span>
                  </div>
                ))}
              </div>
            );
          }

          if (block.type === 'table') {
            return (
              <div key={i} className="table-container">
                <table className="notice-table">
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="table-cell">
                            {cell || <span className="empty-cell">Empty</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* ✍️ OFFICIAL FOOTER - LEFT SIDE */}
      {(notice.signatory?.name || notice.signature) && (
        <div className="footer-left">
          {notice.signature && (
            <div className="signature-container">
              <img
                src={notice.signature.src}
                alt="Signature"
                className="digital-signature"
              />
            </div>
          )}
          <div className="signatory-name">
            {notice.signatory?.name || 'Authorized Signatory'}
          </div>
          <div className="signatory-designation">
            {notice.signatory?.designation || 'Designation'}
          </div>
        </div>
      )}

      {/* 🔴 STAMP - RIGHT SIDE (Bottom Right Corner) */}
      {notice.stamp && (
        <img
          src={notice.stamp.src}
          alt="Official Stamp"
          className="official-stamp"
          style={{
            right: '30px',
            bottom: '40px',
            transform: `scale(${notice.stamp.scale ?? 1})`,
            opacity: 0.9
          }}
        />
      )}
    </div>
  );
}