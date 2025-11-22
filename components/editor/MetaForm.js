'use client';

import { useState } from 'react';
import { FaDownload, FaImage, FaBuilding, FaHeading, FaCalendarAlt, FaFont, FaTextHeight } from 'react-icons/fa';
import { useNoticeStore } from '@/store/noticeStore';
import { exportToPDF, exportToJPG } from '@/lib/exportClient';

export default function MetaForm() {
  const { notice, setNotice } = useNoticeStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNotice({ logo: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      if (format === 'pdf') await exportToPDF();
      else if (format === 'jpg') await exportToJPG();
    } finally {
      setIsExporting(false);
    }
  };

  const fontOptions = [
    { value: 'Noto Serif', label: 'Noto Serif (Default)' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Calibri', label: 'Calibri' },
  ];

  const fontSizeOptions = ['12px', '13px', '14px', '15px', '16px', '18px'];

  const updateFontStyle = (key, value) => {
    setNotice({
      styles: { ...notice.styles, [key]: value }
    });
  };

  return (
    <div className="mb-6 p-5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <FaBuilding className="text-blue-600 dark:text-blue-400" />
        Organization & Notice Details
      </h2>

      <div className="space-y-4">
        {/* Organization Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaBuilding size={14} /> Organization Name
          </label>
          <input
            type="text"
            placeholder="e.g., I.P. (P.G.) College, Bulandshahr"
            value={notice.orgName}
            onChange={(e) => setNotice({ orgName: e.target.value })}
            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Branch / Department */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaBuilding size={14} className="opacity-80" /> Branch / Department
            <span className="text-xs text-gray-500 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Computer Science"
            value={notice.branch || ''}
            onChange={(e) => setNotice({ branch: e.target.value })}
            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Notice Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaHeading size={14} /> Notice Title
          </label>
          <input
            type="text"
            placeholder="e.g., National Pollution Control Day"
            value={notice.title}
            onChange={(e) => setNotice({ title: e.target.value })}
            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaCalendarAlt size={14} /> Date
          </label>
          <input
            type="date"
            value={notice.date}
            onChange={(e) => setNotice({ date: e.target.value })}
            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Logo */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaImage size={14} /> Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/30 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
          />
          {notice.logo && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={notice.logo}
                alt="Logo preview"
                className="h-10 object-contain border rounded p-1 bg-gray-50 dark:bg-zinc-700"
              />
              <button
                type="button"
                onClick={() => setNotice({ logo: null })}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Font Family */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaFont size={14} /> Font Family
          </label>
          <select
            value={notice.styles?.font || 'Noto Serif'}
            onChange={(e) => updateFontStyle('font', e.target.value)}
            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaTextHeight size={14} /> Font Size
          </label>
          <select
            value={notice.styles?.fontSize || '14px'}
            onChange={(e) => updateFontStyle('fontSize', e.target.value)}
            className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
          >
            {fontSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Export */}
        <div className="pt-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FaDownload size={14} /> Quick Export
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <FaDownload size={14} />
              {isExporting ? 'Exporting...' : 'PDF'}
            </button>
            <button
              onClick={() => handleExport('jpg')}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <FaDownload size={14} />
              JPG
            </button>
          </div>
        </div>

        {/* Signatory */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Signatory (Footer)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name (e.g., Dr. A.K. Sharma)"
              value={notice.signatory?.name || ''}
              onChange={(e) => setNotice({ signatory: { ...notice.signatory, name: e.target.value } })}
              className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Designation (e.g., Principal)"
              value={notice.signatory?.designation || ''}
              onChange={(e) => setNotice({ signatory: { ...notice.signatory, designation: e.target.value } })}
              className="w-full p-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Digital Signature */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaImage size={14} /> Upload Digital Signature (PNG recommended)
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                setNotice({
                  signature: {
                    src: ev.target.result
                  }
                });
              };
              reader.readAsDataURL(file);
            }}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 dark:file:bg-green-900/30 dark:file:text-green-300 hover:file:bg-green-100 dark:hover:file:bg-green-900/50"
          />
          {notice.signature && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={notice.signature.src}
                alt="Signature preview"
                className="h-8 object-contain border-b border-gray-400 p-1 bg-gray-50 dark:bg-zinc-700"
              />
              <button
                type="button"
                onClick={() => setNotice({ signature: null })}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Digital Stamp */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FaImage size={14} /> Upload Digital Stamp (PNG with transparency)
          </label>
          <input
            type="file"
            accept="image/png"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                setNotice({
                  stamp: {
                    src: ev.target.result,
                    x: 440,   // default: bottom-right
                    y: 520,
                    scale: 0.9
                  }
                });
              };
              reader.readAsDataURL(file);
            }}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 dark:file:bg-amber-900/30 dark:file:text-amber-300"
          />
          {notice.stamp && (
            <div className="mt-2 flex items-center gap-2">
              <img
                src={notice.stamp.src}
                alt="Stamp preview"
                className="h-12 object-contain border rounded p-1 bg-gray-50 dark:bg-zinc-700"
              />
              <button
                type="button"
                onClick={() => setNotice({ stamp: null })}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}