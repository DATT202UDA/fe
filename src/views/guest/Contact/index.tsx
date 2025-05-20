import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

const ContactView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.heroSection}>
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn</p>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <FaPhone className={styles.icon} />
            <h3>Điện Thoại</h3>
            <p>Hotline: 1900 1234</p>
            <p>Hỗ trợ: 1900 5678</p>
          </div>

          <div className={styles.infoCard}>
            <FaEnvelope className={styles.icon} />
            <h3>Email</h3>
            <p>info@bansanpham.com</p>
            <p>support@bansanpham.com</p>
          </div>

          <div className={styles.infoCard}>
            <FaMapMarkerAlt className={styles.icon} />
            <h3>Địa Chỉ</h3>
            <p>123 Đường ABC, Quận XYZ</p>
            <p>TP. Hồ Chí Minh, Việt Nam</p>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Nội dung tin nhắn"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>

      <div className={styles.mapSection}>
        <h2>Vị Trí Của Chúng Tôi</h2>
        <div className={styles.map}>
          {/* Add your map component here */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674816727!2d106.6981!3d10.7756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzMyLjEiTiAxMDbCsDQxJzUzLjMiRQ!5e0!3m2!1svi!2s!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactView;
