interface PrivacyProps {
  onBack?: () => void;
}

const Privacy = ({ onBack }: PrivacyProps) => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <div style={{ padding: '20px' }}>
      {onBack && (
        <button 
          onClick={onBack}
          style={{ 
            marginBottom: '20px', 
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← 返回
        </button>
      )}
      <h1>隐私政策</h1>
      <p>本网站（卡通工具站）使用 Google AdSense 投放广告。Google 作为第三方供应商，使用 Cookie 来投放广告。</p>
      <p>用户可以通过访问 Google 广告和内容网络隐私政策来了解如何停用个性化广告。</p>
    </div>
  </div>
);

export default Privacy;