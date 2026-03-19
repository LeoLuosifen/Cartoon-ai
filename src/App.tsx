/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ConfigProvider, 
  Layout, 
  App as AntdApp
} from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import FortuneGenerator from './components/FortuneGenerator';
import NamePicker from './components/NamePicker';
import FloatingChat from './components/FloatingChat';

const { Content, Footer } = Layout;

export default function App() {
  const [activeTab, setActiveTab] = useState('fortune');

  // Ant Design Theme Configuration
  const cartoonTheme = {
    token: {
      colorPrimary: '#8b5cf6',
      borderRadius: 16,
      fontFamily: '"ZCOOL KuaiLe", "Inter", sans-serif',
      colorBgContainer: '#ffffff',
      colorText: '#1e293b',
    },
    components: {
      Button: {
        controlHeightLG: 56,
        fontWeight: 700,
      },
      Input: {
        controlHeightLG: 56,
        borderRadiusLG: 16,
      },
      Select: {
        controlHeightLG: 56,
        borderRadiusLG: 16,
      },
      DatePicker: {
        controlHeightLG: 56,
        borderRadiusLG: 16,
      }
    }
  };

  return (
    <ConfigProvider theme={cartoonTheme}>
      <AntdApp>
        <Layout className="min-h-screen bg-transparent">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <Content className="pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'fortune' ? (
                  <FortuneGenerator />
                ) : (
                  <NamePicker />
                )}
              </motion.div>
            </AnimatePresence>
          </Content>
  
          <Footer className="bg-white border-t-4 border-slate-900 py-8 text-center">
            <div className="flex flex-col items-center gap-4">
              {/*<div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors font-bold">隐私政策</a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors font-bold">服务条款</a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors font-bold">联系我们</a>
              </div>*/}
              <p className="text-slate-400 font-bold text-sm">
                © 2026 卡通工具站. 用 ✨ 和 智慧 驱动.
              </p>
            </div>
          </Footer>
  
          <FloatingChat />
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
}
