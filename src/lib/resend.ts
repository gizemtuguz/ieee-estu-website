import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;
export const isResendConfigured = Boolean(resendApiKey);

// Email templates
export const getWelcomeEmailTemplate = (locale: string) => {
  if (locale === 'tr') {
    return {
      subject: '🎉 IEEE ESTU Bültenine Hoş Geldiniz!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #00629B 0%, #004f7c 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">IEEE ESTU</h1>
              <p style="color: #E0F2FE; margin: 10px 0 0 0;">Eskişehir Teknik Üniversitesi Öğrenci Kolu</p>
            </div>
            
            <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #00629B; margin-top: 0;">Hoş Geldiniz! 🎉</h2>
              
              <p>Merhaba,</p>
              
              <p>IEEE ESTU bültenine abone olduğunuz için teşekkür ederiz! Artık teknoloji ve mühendislik dünyasından en güncel haberler, etkinlikler ve fırsatlar sizinle olacak.</p>
              
              <h3 style="color: #00629B; font-size: 18px; margin-top: 30px;">Neler Bekleyebilirsiniz?</h3>
              
              <ul style="padding-left: 20px;">
                <li style="margin-bottom: 10px;">🎯 Yaklaşan workshop ve seminer duyuruları</li>
                <li style="margin-bottom: 10px;">🏆 Yarışma ve proje fırsatları</li>
                <li style="margin-bottom: 10px;">📚 Teknik blog yazıları ve kaynaklar</li>
                <li style="margin-bottom: 10px;">🤝 Networking etkinlikleri</li>
                <li style="margin-bottom: 10px;">🎓 Kariyer gelişim fırsatları</li>
              </ul>
              
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; font-weight: 600; color: #00629B;">💡 İpucu:</p>
                <p style="margin: 10px 0 0 0; font-size: 14px;">Web sitemizi ziyaret ederek tüm etkinliklerimizi inceleyebilir ve hemen katılabilirsiniz!</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://ieeeestu.org" style="display: inline-block; background: linear-gradient(to right, #00629B, #004f7c); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">Web Sitemizi Ziyaret Edin</a>
              </div>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 14px; color: #6B7280; margin: 0;">Sosyal medyada takip edin:</p>
                <div style="margin-top: 15px;">
                  <a href="https://www.instagram.com/ieee.estu/" style="color: #00629B; text-decoration: none; margin-right: 15px;">Instagram</a>
                  <a href="https://www.linkedin.com/company/ieee-estu/" style="color: #00629B; text-decoration: none; margin-right: 15px;">LinkedIn</a>
                  <a href="https://twitter.com/ieeeestu" style="color: #00629B; text-decoration: none; margin-right: 15px;">Twitter</a>
                  <a href="https://medium.com/@ieee-estu" style="color: #00629B; text-decoration: none;">Medium</a>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #9CA3AF;">
              <p>© ${new Date().getFullYear()} IEEE ESTU. Tüm hakları saklıdır.</p>
              <p style="margin-top: 10px;">
                Bu e-postayı almak istemiyorsanız, lütfen <a href="mailto:ieee.estu@gmail.com?subject=Bülten Aboneliğinden Çık" style="color: #00629B;">bizimle iletişime geçin</a>.
              </p>
            </div>
          </body>
        </html>
      `,
    };
  }

  // English version
  return {
    subject: '🎉 Welcome to IEEE ESTU Newsletter!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #00629B 0%, #004f7c 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">IEEE ESTU</h1>
            <p style="color: #E0F2FE; margin: 10px 0 0 0;">Eskisehir Technical University Student Branch</p>
          </div>
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #00629B; margin-top: 0;">Welcome! 🎉</h2>
            
            <p>Hello,</p>
            
            <p>Thank you for subscribing to the IEEE ESTU newsletter! You'll now receive the latest news, events, and opportunities from the world of technology and engineering.</p>
            
            <h3 style="color: #00629B; font-size: 18px; margin-top: 30px;">What to Expect?</h3>
            
            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 10px;">🎯 Upcoming workshop and seminar announcements</li>
              <li style="margin-bottom: 10px;">🏆 Competition and project opportunities</li>
              <li style="margin-bottom: 10px;">📚 Technical blog posts and resources</li>
              <li style="margin-bottom: 10px;">🤝 Networking events</li>
              <li style="margin-bottom: 10px;">🎓 Career development opportunities</li>
            </ul>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0; font-weight: 600; color: #00629B;">💡 Tip:</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Visit our website to explore all our events and join right away!</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://ieeeestu.org" style="display: inline-block; background: linear-gradient(to right, #00629B, #004f7c); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">Visit Our Website</a>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #6B7280; margin: 0;">Follow us on social media:</p>
              <div style="margin-top: 15px;">
                <a href="https://www.instagram.com/ieee.estu/" style="color: #00629B; text-decoration: none; margin-right: 15px;">Instagram</a>
                <a href="https://www.linkedin.com/company/ieee-estu/" style="color: #00629B; text-decoration: none; margin-right: 15px;">LinkedIn</a>
                <a href="https://twitter.com/ieeeestu" style="color: #00629B; text-decoration: none; margin-right: 15px;">Twitter</a>
                <a href="https://medium.com/@ieee-estu" style="color: #00629B; text-decoration: none;">Medium</a>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #9CA3AF;">
            <p>© ${new Date().getFullYear()} IEEE ESTU. All rights reserved.</p>
            <p style="margin-top: 10px;">
              If you no longer wish to receive these emails, please <a href="mailto:ieee.estu@gmail.com?subject=Unsubscribe from Newsletter" style="color: #00629B;">contact us</a>.
            </p>
          </div>
        </body>
      </html>
    `,
  };
};
