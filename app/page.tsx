import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateScripts from '@/components/TemplateScripts';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section Style 8 - Exact Template Match */}
      <section className="vs-hero vs-hero--style8 z-index-common parallax-wrap" style={{ position: 'relative' }}>
        {/* Shape Banner Decoration */}
        <div className="vs-hero__shape-banner" style={{ pointerEvents: 'none', zIndex: -1 }}>
          <img src="/assets/img/home-6/banner-shape.svg" alt="shape" />
        </div>



        {/* Swiper Container */}
        <div className="swiper heroSwiperh5">
          <div className="swiper-wrapper">
            <div className="swiper-slide" style={{ padding: '100px 0 120px 0' }}>
              {/* Purple Background */}
              <div className="vs-hero__bg" style={{ backgroundColor: '#7B2CBF', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>

              <div className="container" style={{ position: 'relative' }}>
                {/* Cute Decorations on Sides */}
                {/* Top Left Star */}
                <div style={{ position: 'absolute', top: '10%', left: '2%', zIndex: 10 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                  </svg>
                </div>

                {/* Top Right Heart */}
                <div style={{ position: 'absolute', top: '15%', right: '5%', zIndex: 10 }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="#FF6B9D">
                    <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" />
                  </svg>
                </div>

                {/* Bottom Left Cloud */}
                <div style={{ position: 'absolute', bottom: '20%', left: '3%', zIndex: 10 }}>
                  <svg width="50" height="35" viewBox="0 0 50 35" fill="#00D9FF" opacity="0.8">
                    <path d="M40,15c0-5.5-4.5-10-10-10c-2,0-3.9,0.6-5.5,1.6C22.3,2.5,18.4,0,14,0C7.4,0,2,5.4,2,12c0,0.3,0,0.7,0.1,1C0.8,14.3,0,16,0,18c0,4.4,3.6,8,8,8h30c5.5,0,10-4.5,10-10S45.5,15,40,15z" />
                  </svg>
                </div>

                {/* Bottom Right Star */}
                <div style={{ position: 'absolute', bottom: '25%', right: '4%', zIndex: 10 }}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="#7FFF00">
                    <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                  </svg>
                </div>

                <div className="row justify-content-center align-items-center">
                  {/* Left Side - Circular Framed Flower with Slider */}
                  <div className="col-xl-4 col-lg-4 col-md-5">
                    <div className="vs-hero__img-shape position-relative" style={{ textAlign: 'center', padding: '0' }}>
                      {/* Circular Border Frame */}
                      <div style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '380px',
                        height: '380px',
                        borderRadius: '50%',
                        border: '8px solid rgba(255, 215, 0, 0.5)',
                        padding: '15px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
                      }}>
                        {/* Flower Petals SVG */}
                        <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%' }}>
                          {/* Center Circle */}
                          <circle cx="250" cy="250" r="100" fill="#7FFF00" />
                          {/* Petals - 8 colorful petals */}
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                            const colors = ['#FFD700', '#FF6B9D', '#7FFF00', '#00D9FF', '#FFD700', '#FF6B9D', '#9D4EDD', '#00D9FF'];
                            const dotColors = ['#FF6B9D', '#FFD700', '#FF6B9D', '#7FFF00', '#9D4EDD', '#00D9FF', '#FFD700', '#FF6B9D'];
                            const rad = (angle * Math.PI) / 180;
                            const x = 250 + Math.cos(rad) * 140;
                            const y = 250 + Math.sin(rad) * 140;
                            return (
                              <g key={i}>
                                <ellipse cx={x} cy={y} rx="60" ry="90" fill={colors[i]} transform={`rotate(${angle} ${x} ${y})`} />
                                {[0, 1, 2].map((dotIdx) => (
                                  <circle key={dotIdx} cx={x + (dotIdx - 1) * 20} cy={y} r="8" fill={dotColors[i]} opacity="0.6" />
                                ))}
                              </g>
                            );
                          })}
                        </svg>
                        {/* Slider Image in Center */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                          <img src="/assets/img/home-8/slider.png" alt="Kumwals'ta Oynayan Çocuklar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content with Bigger Text */}
                  <div className="col-xl-6 col-lg-6 col-md-7">
                    <div className="vs-hero__content text-center text-md-start" style={{ padding: '20px' }}>
                      <span className="vs-hero__title--sub vs-hero__anim1 manimated d-inline-flex align-items-center gap-2 mb-3" style={{ animationDelay: '0.6s', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#FFD700', fontWeight: '700' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFD700">
                          <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                        </svg>
                        ÇOCUK OYUN PARKI
                      </span>
                      <h1 className="vs-hero__title--main vs-hero__anim1 manimated mb-3" style={{ animationDelay: '0.85s', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.15', color: '#ffffff', fontWeight: '900', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
                        <span style={{ color: '#FFD700' }}>KUMWALS'A</span> HOŞ GELDİNİZ
                        <span style={{ display: 'block', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginTop: '15px' }}>KAPALIALANDAN OYUN</span>
                      </h1>
                      <p className="vs-hero__desc vs-hero__anim1 manimated mb-4" style={{ animationDelay: '1.1s', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.95)', lineHeight: '1.6', fontWeight: '500' }}>
                        Tutkumuz Çocukluk ve Biz Anaokulundayız
                      </p>

                      <a href="/iletisim" className="vs-btn vs-hero__btn vs-hero__anim1 manimated" style={{ animationDelay: '1.35s', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', padding: '15px 40px', backgroundColor: '#FFD700', color: '#333', fontWeight: '800', borderRadius: '50px', boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)', border: 'none' }}>
                        <span className="vs-btn__border"></span>
                        BİLET SATIN AL
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', pointerEvents: 'none', zIndex: 10 }}>
          <img src="/assets/img/home-6/banner-shape.svg" alt="wave" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* Services / Rides Section (Style 8) */}
      <section className="vs-rides--area space overflow-hidden" style={{ backgroundColor: '#ffffff', paddingTop: '80px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-50">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="#7B2CBF">
                  <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                </svg>
                <span className="vs-title__sub" style={{ color: '#7B2CBF', fontWeight: '700', fontSize: '1rem', letterSpacing: '1px' }}>Neler Sunuyoruz?</span>
              </div>
              <h2 className="vs-title__main" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '15px' }}>
                Eğlenceli <span style={{ color: '#7B2CBF' }}>Aktiviteler & Atölyeler</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                Çocuklarınız için özenle tasarlanmış güvenli ve eğitici aktiviteler
              </p>
            </div>
          </div>
          <div className="row">
            {[
              { title: "Kum Havuzu", icon: "fas fa-umbrella-beach", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
              { title: "Kaydıraklar", icon: "fas fa-person-walking-arrow-right", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
              { title: "Top Havuzu", icon: "fas fa-baseball", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
              { title: "Boyama Alanı", icon: "fas fa-palette", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }
            ].map((s, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-30 wow animate__fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`}>
                <div className="vs-feature position-relative" style={{
                  background: s.gradient,
                  borderRadius: '25px',
                  padding: '30px 20px',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div className="vs-feature__icon mb-3" style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}>
                    <i className={s.icon} style={{ fontSize: '2rem', color: '#ffffff' }}></i>
                  </div>
                  <h3 className="vs-feature__title mb-3" style={{
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '1.3rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {s.title}
                  </h3>
                  <a href="/atolyeler" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="fas fa-arrow-right" style={{ fontSize: '1rem', color: '#ffffff' }}></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Style 8 */}
      <section className="space-extra-top space-extra-bottom overflow-hidden vs-about-h8" style={{ backgroundColor: '#F9F6FF' }}>
        <div className="container">
          <div className="row align-items-center gx-50">
            <div className="col-lg-6 mb-30 wow animate__fadeInLeft" data-wow-delay="0.25s">
              <div className="vs-about-h8__image position-relative">
                <img src="/assets/img/home-8/about-img1-h8.jpg" alt="Kumwals Hakkında" className="img-bottom border-radius-20 shadow-lg" style={{ borderRadius: '30px', width: '100%' }} />
                {/* Decorative Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: '#FFD700',
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
                  transform: 'rotate(-15deg)'
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#333', lineHeight: '1' }}>5+</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#333' }}>ŞUBE</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-30 wow animate__fadeInRight" data-wow-delay="0.25s">
              <div className="vs-about-h8__content">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="#7B2CBF">
                    <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                  </svg>
                  <span className="vs-title__sub" style={{ color: '#7B2CBF', fontWeight: '700', fontSize: '1rem', letterSpacing: '1px' }}>Hakkımızda</span>
                </div>
                <h2 className="vs-title__main" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '20px' }}>
                  Daha Çok Oyun, <span style={{ color: '#7B2CBF' }}>Daha Çok Eğlence</span>
                </h2>
                <p className="vs-text pt-15" style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
                  Kumwals, çocukların fiziksel ve zihinsel gelişimini destekleyen modern bir oyun alanıdır. Hijyen standartlarımız ve uzman gözetmenlerimizle ailelere huzur, çocuklara ise sonsuz mutluluk sunuyoruz.
                </p>

                {/* Colorful Feature Boxes */}
                <div className="row pt-20 mb-30">
                  {[
                    { icon: "fas fa-shield-alt", title: "%100 Güvenli", desc: "Tüm alanlarımız güvenlik sertifikalıdır.", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
                    { icon: "fas fa-magic", title: "Eğitici Atölye", desc: "Yaratıcılığı tetikleyen özel programlar.", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
                    { icon: "fas fa-hand-holding-heart", title: "Hijyenik Kum", desc: "Sterilize edilmiş özel oyun kumu.", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
                    { icon: "fas fa-users", title: "Uzman Kadro", desc: "Deneyimli gözetmenler eşliğinde oyun.", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
                  ].map((feature, idx) => (
                    <div key={idx} className="col-md-6 mb-20">
                      <div className="feature-box p-4 h-100" style={{
                        background: feature.gradient,
                        borderRadius: '20px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease'
                      }}>
                        <div className="d-flex align-items-center mb-2">
                          <i className={feature.icon} style={{ fontSize: '1.5rem', marginRight: '15px', color: '#ffffff' }}></i>
                          <h4 className="h6 mb-0 fw-bold" style={{ color: '#ffffff' }}>{feature.title}</h4>
                        </div>
                        <p className="small mb-0" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="/hakkimizda" className="vs-btn" style={{
                  backgroundColor: '#7B2CBF',
                  color: '#ffffff',
                  padding: '15px 35px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 5px 20px rgba(123, 44, 191, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  <span className="vs-btn__border"></span>BİZİ TANIYIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Purple Theme */}
      <section className="space text-white overflow-hidden position-relative" style={{ backgroundColor: '#7B2CBF', paddingTop: '80px', paddingBottom: '80px' }}>
        {/* Top Wave */}
        <div style={{ position: 'absolute', top: '-2px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
            <path d="M0,30 Q300,90 600,60 T1200,60 L1200,0 L0,0 Z" fill="#F9F6FF" />
          </svg>
        </div>

        {/* Background Decorations */}
        <div style={{ position: 'absolute', top: '20%', left: '5%', opacity: 0.1 }}>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '8%', opacity: 0.1 }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="#ffffff">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>

        <div className="container">
          <div className="row justify-content-between align-items-center text-center">
            {[
              { number: "5+", label: "ŞUBE" },
              { number: "2M+", label: "MUTLU ÇOCUK" },
              { number: "%100", label: "YERLİ SERMAYE" },
              { number: "15+", label: "ATÖLYE" }
            ].map((stat, idx) => (
              <div key={idx} className="col-lg-3 col-6 mb-30 wow animate__fadeInUp" data-wow-delay={`${0.2 + idx * 0.1}s`}>
                <div className="stat-item" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '25px',
                  padding: '30px 20px',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease'
                }}>
                  <h2 className="text-white mb-0" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 900,
                    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '10px'
                  }}>
                    {stat.number}
                  </h2>
                  <p className="text-white mb-0 fw-bold" style={{
                    letterSpacing: '2px',
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                  }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave */}
        <div style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
            <path d="M0,0 Q300,60 600,30 T1200,30 L1200,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <Footer />
      <TemplateScripts />
    </main>
  );
}
