import React from 'react';

const Footer = () => {
  const styles = {
    // Footer container styles
    footer: {
      position: 'relative', // Positioned relative to allow the video to be positioned absolutely inside it
      overflow: 'hidden', // Prevents content from overflowing outside the footer
      backgroundColor: '#000', // Black background color for the footer
      color: '#fff', // White text color
      textAlign: 'center', // Centers the text horizontally
      padding: '20px 0', // Padding for space inside the footer
      top: '100px', // Moves the footer 100px down from the top of the page
    },
    // Video container that holds the background video
    videoContainer: {
      position: 'absolute', // Positioned absolutely to cover the whole footer
      top: 0, // Aligns the top edge of the video container to the top of the footer
      left: 0, // Aligns the left edge to the left of the footer
      width: '100%', // Takes up 100% of the width of the footer
      height: '100%', // Takes up 100% of the height of the footer
      zIndex: -1, // Places the video behind the content of the footer
    },
    // Video styling to make it fit the container
    backgroundVideo: {
      width: '100%', // Makes the video fill the entire width
      height: '100%', // Makes the video fill the entire height
      objectFit: 'cover', // Ensures the video covers the area without distortion
    },
    // Content container inside the footer
    content: {
      position: 'relative', // Positioned relatively so it stays above the background video
      zIndex: 1, // Makes sure the content appears above the background video
      padding: '20px', // Padding for space inside the content area
    },
    // Container for all footer elements
    footerContainer: {
      display: 'flex', // Uses flexbox to align items
      flexDirection: 'column', // Arranges items vertically
      alignItems: 'center', // Centers items horizontally
      gap: '20px', // Adds space between each item
    },
    // Company info section
    companyInfo: {
      textAlign: 'center', // Centers the text inside this section
    },
    companyName: {
      fontSize: '24px', // Large font size for the company name
      fontWeight: 'bold', // Makes the company name bold
    },
    tagline: {
      fontSize: '16px', // Slightly smaller font size for the tagline
      marginTop: '5px', // Small margin above the tagline
    },
    copyright: {
      fontSize: '12px', // Small font size for the copyright text
      marginTop: '10px', // Adds space above the copyright text
    },
    // Center text section with highlighted word
    centerText: {
      textAlign: 'center', // Centers the text
      fontSize: '20px', // Font size for the header text
      fontWeight: 'bold', // Makes the header text bold
    },
    highlight: {
      color: '#ff6347', // Orange-red color to highlight specific text
    },
    // Social media links container
    socialLinks: {
      display: 'flex', // Aligns social media icons horizontally
      gap: '10px', // Adds space between the icons
    },
    // Styles for individual social media icons
    socialIcon: {
      color: '#fff', // White color for icons
      textDecoration: 'none', // Removes the underline from links
      fontSize: '24px', // Sets the icon size
    },
    // Icon size and hover effect for social media icons
    icon: {
      width: '24px', // Width of the social media icon
      height: '24px', // Height of the social media icon
      hover: {
        color: '#ff6347', // Changes the icon color when hovered
      },
    }
  };

  return (
    <footer style={styles.footer}>
      {/* Background Video - Positioned behind the footer content */}
      <div style={styles.videoContainer}>
        <video
          style={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://example.com/video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      <div style={styles.content}>
        <div style={styles.footerContainer}>
          {/* Company Info Section */}
          <div style={styles.companyInfo}>
            <h2 style={styles.companyName}>AAYUSH JAIN</h2> {/* Company name */}
            <p style={styles.tagline}>Find your dream job with us</p> {/* Tagline */}
            <p style={styles.copyright}>© 2024 Your Company. All rights reserved.</p> {/* Copyright notice */}
          </div>

          {/* Center Text Section with highlighted word */}
          <div style={styles.centerText}>
            <h2>SHOPPING <span style={styles.highlight}>STORE</span></h2> {/* Highlighted word "STORE" */}
          </div>

          {/* Social Media Links Section */}
          <div style={styles.socialLinks}>
            {/* Facebook Icon */}
            <a href="https://facebook.com" style={styles.socialIcon} aria-label="Facebook">
              <svg style={styles.icon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>
            {/* LinkedIn Icon */}
            <a href="https://linkedin.com" style={styles.socialIcon} aria-label="LinkedIn">
              <svg style={styles.icon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
