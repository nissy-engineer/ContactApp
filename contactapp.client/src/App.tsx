import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductList from './pages/products/ProductList';
import ThreadList from './pages/products/ThreadList'; 
import ThreadDetail from './pages/products/ThreadDetail';
import Settings from './pages/Settings';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:productId" element={<ThreadList />} />
                    <Route path="/products/thread/:threadId" element={<ThreadDetail />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;