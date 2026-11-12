'use client';

import { useEffect, useState, type FormEvent } from 'react';

type Profile = {
  username: string;
  bio: string;
  website: string;
  posts: string;
  followers: string;
  following: string;
  avatar: string;
};

const defaultProfile: Profile = {
  username: 'najmeh.ahmadloo',
  bio: 'her ✨',
  website: 'iran.ir',
  posts: '۳',
  followers: '۱۳۳',
  following: '۳٬۲۵۵',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=85',
};

const posts = [
  {
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=85',
    caption: 'قاب‌هایی از آرامش دریا',
  },
  {
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85',
    caption: 'شب‌های روشن',
  },
  {
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=85',
    caption: 'یک روز قشنگ',
  },
];

const highlights = [
  { title: '📷', style: 'sunset', symbol: '🌅' },
  { title: '✍🏻', style: 'dark', symbol: '☀️' },
  { title: '🤍', style: 'gold', symbol: '✦' },
  { title: 'LeGeNd', style: 'sketch', symbol: '♙' },
];

export default function Home() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [draft, setDraft] = useState<Profile>(defaultProfile);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('profile-admin-demo');
      if (stored) {
        const parsed = { ...defaultProfile, ...JSON.parse(stored) } as Profile;
        setProfile(parsed);
        setDraft(parsed);
      }
    } catch {
      // Ignore invalid local browser data and keep the defaults.
    }
  }, []);

  function openPanel() {
    setDraft(profile);
    setSaved(false);
    setPanelOpen(true);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfile(draft);
    localStorage.setItem('profile-admin-demo', JSON.stringify(draft));
    setSaved(true);
  }

  function resetProfile() {
    setProfile(defaultProfile);
    setDraft(defaultProfile);
    localStorage.removeItem('profile-admin-demo');
    setSaved(true);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <button className="icon-button menu-button" aria-label="منو">⋮</button>
        <div className="topbar-title">{profile.username}</div>
        <button className="icon-button notification-button" aria-label="باز کردن پنل مدیریت" onClick={openPanel}>
          ♧<span className="notification-dot" />
        </button>
      </header>

      <section className="profile-section" aria-label="اطلاعات پروفایل">
        <div className="profile-top">
          <div className="profile-stats">
            <div className="stat"><strong>{profile.following}</strong><span>دنبال‌شونده</span></div>
            <div className="stat"><strong>{profile.followers}</strong><span>دنبال‌کنندگان</span></div>
            <div className="stat"><strong>{profile.posts}</strong><span>پست</span></div>
          </div>
          <img className="avatar" src={profile.avatar} alt="عکس پروفایل" />
        </div>

        <div className="profile-bio">
          <p>{profile.bio}</p>
          <a href={`https://${profile.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">
            {profile.website} <span aria-hidden="true">↗</span>
          </a>
          <span className="username-pill">@{profile.username}</span>
        </div>

        <div className="profile-actions">
          <button className="primary-button" onClick={openPanel}>ویرایش پروفایل</button>
          <button className="secondary-button" onClick={openPanel}>اشتراک‌گذاری نمایه</button>
          <button className="add-person-button" aria-label="افزودن دوست">♙+</button>
        </div>
      </section>

      <section className="highlights" aria-label="هایلایت‌ها">
        {highlights.map((item) => (
          <button className="highlight" key={item.title}>
            <span className={`highlight-image ${item.style}`}>{item.symbol}</span>
            <span className="highlight-title">{item.title}</span>
          </button>
        ))}
      </section>

      <nav className="tabs" aria-label="بخش‌های پروفایل">
        <button aria-label="عکس‌های تگ‌شده">♙</button>
        <button aria-label="بازنشرها">⟳</button>
        <button aria-label="ویدیوها">▷</button>
        <button className="active-tab" aria-label="پست‌ها">▦</button>
      </nav>

      <section className="post-grid" aria-label="پست‌ها">
        <button className="add-post" onClick={openPanel}>
          <span className="plus-box">+</span><span>افزودن پست</span>
        </button>
        {posts.map((post) => (
          <article className="post-card" key={post.image}>
            <img src={post.image} alt={post.caption} />
            <span className="video-mark" aria-hidden="true">▷</span>
            <span className="post-caption">{post.caption}</span>
          </article>
        ))}
      </section>

      <nav className="bottom-nav" aria-label="ناوبری اصلی">
        <button aria-label="خانه">⌂</button>
        <button aria-label="جستجو">⌕</button>
        <button aria-label="ایجاد پست" onClick={openPanel}>⊞</button>
        <button aria-label="ویدیو">▷</button>
        <button className="bottom-avatar" aria-label="پروفایل" onClick={openPanel}>
          <img src={profile.avatar} alt="" />
        </button>
      </nav>

      {panelOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPanelOpen(false);
        }}>
          <section className="admin-panel" role="dialog" aria-modal="true" aria-labelledby="admin-title">
            <div className="panel-heading">
              <div><span className="panel-eyebrow">مدیریت صفحه</span><h1 id="admin-title">ویرایش پروفایل</h1></div>
              <button className="close-button" onClick={() => setPanelOpen(false)} aria-label="بستن پنل">×</button>
            </div>
            <p className="demo-notice">این پنل نمایشی است؛ تغییرات فقط در همین مرورگر ذخیره می‌شوند و ورود امن یا حساب کاربری واقعی ندارد.</p>
            <form onSubmit={saveProfile} className="admin-form">
              <label>نام کاربری<input value={draft.username} onChange={(event) => setDraft({ ...draft, username: event.target.value })} required /></label>
              <label>متن معرفی<input value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} /></label>
              <label>لینک وب‌سایت<input value={draft.website} onChange={(event) => setDraft({ ...draft, website: event.target.value })} placeholder="example.com" /></label>
              <label>نشانی عکس پروفایل<input dir="ltr" value={draft.avatar} onChange={(event) => setDraft({ ...draft, avatar: event.target.value })} placeholder="https://..." /></label>
              <div className="form-row">
                <label>تعداد پست<input value={draft.posts} onChange={(event) => setDraft({ ...draft, posts: event.target.value })} /></label>
                <label>دنبال‌کننده<input value={draft.followers} onChange={(event) => setDraft({ ...draft, followers: event.target.value })} /></label>
                <label>دنبال‌شونده<input value={draft.following} onChange={(event) => setDraft({ ...draft, following: event.target.value })} /></label>
              </div>
              <div className="form-actions">
                <button className="primary-button" type="submit">ذخیره تغییرات</button>
                <button className="secondary-button reset-button" type="button" onClick={resetProfile}>بازگردانی پیش‌فرض</button>
              </div>
              {saved && <p className="saved-message" role="status">تغییرات ذخیره شد.</p>}
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
