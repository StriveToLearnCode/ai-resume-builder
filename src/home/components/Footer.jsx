import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '20px 0',
        color: '#666',
        fontSize: '14px',
        borderTop: '1px solid #eee',
        marginTop: '40px',
        userSelect: 'none',
      }}
    >
      {t('footer_text')}
    </footer>
  )
}

export default Footer
