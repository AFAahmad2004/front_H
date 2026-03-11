import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { id: "kitchens",  label: "مطابخ",       icon: "🍳" },
  { id: "bedrooms",  label: "غرف نوم",      icon: "🛏️" },
  { id: "living",    label: "غرف معيشة",    icon: "🛋️" },
  { id: "offices",   label: "مكاتب",        icon: "🪑" },
  { id: "bathrooms", label: "حمامات",       icon: "🚿" },
  { id: "outdoor",   label: "خارجي",        icon: "🌿" },
];

const GREEN = "#1B4D2E";
const GOLD  = "#C9A84C";
const GOLD2 = "#e8c96a";

export default function Home() {
  const [updates, setUpdates] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("https://back-h-sr2i.onrender.com//updates").then(r => r.json()).catch(() => []),
      fetch("https://back-h-sr2i.onrender.com//products?home=1").then(r => r.json()).catch(() => []),
    ]).then(([u, p]) => { setUpdates(u); setFeaturedProducts(p); setLoading(false); });
  }, []);

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif", background: "#f5f7f5", minHeight: "100vh" }}>

      {/* ===== HERO ===== */}
      <div style={{
        background: `linear-gradient(135deg, ${GREEN} 0%, #245f38 60%, #2d7a47 100%)`,
        padding: "80px 24px 100px",
        textAlign: "center", color: "#fff",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${GOLD} 0, ${GOLD} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }} />

        {/* Logo in hero */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <img src="/logo.png" alt="Arab Decoration" style={{ height: "90px", objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.3))" }}
            onError={e => e.target.style.display = "none"} />
        </div>

        <h1 style={{ fontSize: "36px", margin: "0 0 8px", fontWeight: "900", color: GOLD, letterSpacing: "1px", position: "relative" }}>
          ARAB DECORATION
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", margin: "0 0 32px", position: "relative" }}>
          أثاث وديكور فاخر لكل ركن من منزلك
        </p>

        {/* Gold divider */}
        <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px", margin: "0 auto 32px", position: "relative" }} />

        <button onClick={() => navigate("/products/kitchens")} style={{
          padding: "14px 40px",
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
          color: GREEN, border: "none", borderRadius: "30px",
          cursor: "pointer", fontWeight: "800", fontSize: "15px",
          boxShadow: `0 4px 20px rgba(201,168,76,0.4)`,
          position: "relative", transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          تصفح المنتجات ←
        </button>

        {/* Wave */}
        <svg viewBox="0 0 1440 60" style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f5f7f5" />
        </svg>
      </div>

      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px" }}>

        {/* ===== CATEGORIES ===== */}
        <section style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "4px", height: "24px", background: `linear-gradient(180deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px" }} />
            <h2 style={{ color: GREEN, margin: 0, fontSize: "22px", fontWeight: "800" }}>الأقسام</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: "14px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => navigate(`/products/${cat.id}`)} style={{
                padding: "22px 12px", background: "#fff",
                border: `2px solid transparent`,
                borderRadius: "16px", cursor: "pointer", textAlign: "center",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 20px rgba(201,168,76,0.2)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}
              >
                <p style={{ fontSize: "34px", margin: "0 0 8px" }}>{cat.icon}</p>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: GREEN }}>{cat.label}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ===== FEATURED PRODUCTS ===== */}
        {featuredProducts.length > 0 && (
          <section style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "4px", height: "24px", background: `linear-gradient(180deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px" }} />
              <h2 style={{ color: GREEN, margin: 0, fontSize: "22px", fontWeight: "800" }}>منتجات مميزة</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "18px" }}>
              {featuredProducts.map(p => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{
                  background: "#fff", borderRadius: "16px", overflow: "hidden",
                  border: `1px solid #e8ede8`,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 12px 28px rgba(27,77,46,0.15)`; e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = "#e8ede8"; }}
                >
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "170px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "130px", background: `linear-gradient(135deg, #e8f0e8, #d4e4d4)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>📦</div>
                  )}
                  {/* Gold accent bar */}
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${GREEN}, ${GOLD})` }} />
                  <div style={{ padding: "16px" }}>
                    <p style={{ margin: "0 0 5px", fontWeight: "700", color: GREEN, fontSize: "14px" }}>{p.name}</p>
                    <p style={{ margin: 0, color: GOLD, fontWeight: "800", fontSize: "15px" }}>{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== UPDATES ===== */}
        {updates.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "4px", height: "24px", background: `linear-gradient(180deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px" }} />
              <h2 style={{ color: GREEN, margin: 0, fontSize: "22px", fontWeight: "800" }}>آخر الأخبار</h2>
            </div>
            {loading ? <p style={{ color: "#aaa" }}>⏳ جاري التحميل...</p> : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {updates.map(u => (
                  <div key={u.id} style={{ background: "#fff", border: `1px solid #e8ede8`, padding: "18px 20px", borderRadius: "14px", borderRight: `4px solid ${GOLD}` }}>
                    <h3 style={{ margin: "0 0 6px", color: GREEN, fontSize: "15px" }}>{u.title}</h3>
                    <p style={{ margin: "0 0 8px", color: "#555", fontSize: "13px" }}>{u.content}</p>
                    <small style={{ color: "#aaa" }}>🕒 {u.date}</small>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ===== CTA Banner ===== */}
        <div style={{
          marginTop: "56px", padding: "40px 32px",
          background: `linear-gradient(135deg, ${GREEN}, #245f38)`,
          borderRadius: "20px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, ${GOLD} 0, ${GOLD} 1px, transparent 0, transparent 50%)`, backgroundSize: "20px 20px" }} />
          <img src="/logo.png" alt="" style={{ height: "50px", marginBottom: "12px", opacity: 0.9 }} onError={e => e.target.style.display = "none"} />
          <h3 style={{ color: GOLD, margin: "0 0 8px", fontSize: "20px", fontWeight: "800", position: "relative" }}>هل تحتاج إلى استشارة؟</h3>
          <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 20px", position: "relative" }}>فريقنا جاهز لمساعدتك في اختيار الأنسب لمنزلك</p>
          <button onClick={() => navigate("/contact")} style={{
            padding: "12px 32px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
            color: GREEN, border: "none", borderRadius: "25px",
            cursor: "pointer", fontWeight: "800", fontSize: "14px", position: "relative",
          }}>تواصل معنا الآن</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: GREEN, padding: "24px", textAlign: "center", marginTop: "20px" }}>
        <img src="/logo.png" alt="Arab Decoration" style={{ height: "36px", marginBottom: "8px" }} onError={e => e.target.style.display = "none"} />
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>© 2025 Arab Decoration — جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}