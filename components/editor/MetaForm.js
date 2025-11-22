'use client';

import { useNoticeStore } from '@/store/noticeStore';

export default function MetaForm() {
  const { notice, setNotice } = useNoticeStore();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setNotice({ logo: event.target.result }); // base64 preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-lg font-bold mb-3">Organization Details</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm">Organization Name</label>
          <input
            type="text"
            value={notice.orgName}
            onChange={(e) => setNotice({ orgName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Notice Title</label>
          <input
            type="text"
            value={notice.title}
            onChange={(e) => setNotice({ title: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Date</label>
          <input
            type="date"
            value={notice.date}
            onChange={(e) => setNotice({ date: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full"
          />
          {notice.logo && (
            <img
              src={notice.logo}
              alt="Logo preview"
              className="mt-2 h-12 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}