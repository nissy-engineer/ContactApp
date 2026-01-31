import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

// 仮データ
const allProducts = [
    { id: 'AX-3697', name: '製品A', unanswered: 4, inProgress: 7, completed: 23, updatedAt: '2時間前' },
    { id: 'DX-4453', name: '製品B', unanswered: 2, inProgress: 3, completed: 15, updatedAt: '1日前' },
    { id: 'BX-2891', name: '製品C', unanswered: 0, inProgress: 1, completed: 8, updatedAt: '3時間前' },
    { id: 'CX-5612', name: '製品D', unanswered: 1, inProgress: 2, completed: 12, updatedAt: '5時間前' },
    { id: 'AX-7834', name: '製品E', unanswered: 3, inProgress: 5, completed: 18, updatedAt: '1週間前' },
    { id: 'DX-9123', name: '製品F', unanswered: 0, inProgress: 0, completed: 5, updatedAt: '2週間前' },
    { id: 'EX-1245', name: '製品G', unanswered: 5, inProgress: 4, completed: 20, updatedAt: '4時間前' },
    { id: 'FX-6789', name: '製品H', unanswered: 1, inProgress: 6, completed: 30, updatedAt: '6時間前' },
    { id: 'GX-3421', name: '製品I', unanswered: 0, inProgress: 2, completed: 10, updatedAt: '2日前' },
    { id: 'HX-8956', name: '製品J', unanswered: 2, inProgress: 1, completed: 7, updatedAt: '12時間前' },
    { id: 'IX-5234', name: '製品K', unanswered: 6, inProgress: 8, completed: 25, updatedAt: '30分前' },
    { id: 'JX-7612', name: '製品L', unanswered: 0, inProgress: 3, completed: 14, updatedAt: '3日前' },
    { id: 'KX-4398', name: '製品M', unanswered: 3, inProgress: 4, completed: 19, updatedAt: '8時間前' },
    { id: 'LX-9087', name: '製品N', unanswered: 1, inProgress: 0, completed: 6, updatedAt: '4日前' },
    { id: 'MX-2156', name: '製品O', unanswered: 4, inProgress: 5, completed: 22, updatedAt: '1時間前' },
    { id: 'NX-6543', name: '製品P', unanswered: 0, inProgress: 1, completed: 9, updatedAt: '5日前' },
    { id: 'OX-8821', name: '製品Q', unanswered: 2, inProgress: 3, completed: 16, updatedAt: '10時間前' },
    { id: 'PX-3347', name: '製品R', unanswered: 5, inProgress: 2, completed: 11, updatedAt: '15時間前' },
    { id: 'QX-7654', name: '製品S', unanswered: 1, inProgress: 4, completed: 27, updatedAt: '6日前' },
    { id: 'RX-1928', name: '製品T', unanswered: 0, inProgress: 0, completed: 4, updatedAt: '1週間前' },
    { id: 'SX-5567', name: '製品U', unanswered: 3, inProgress: 6, completed: 21, updatedAt: '20分前' },
];

const ProductList: React.FC = () => {
    const navigate = useNavigate();

    const handleRowClick = (productId: string) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className="product-list-container">
            <header className="page-header">
                <h1 className="page-title">製品一覧</h1>
            </header>

            <div className="search-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="製品番号または製品名で検索..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="product-table">
                    <colgroup>
                        <col style={{ width: '15%' }} /> {/* 製品番号 */}
                        <col style={{ width: '37%' }} /> {/* 製品名 */}
                        <col style={{ width: '12%' }} /> {/* 未回答 */}
                        <col style={{ width: '12%' }} /> {/* 対応中 */}
                        <col style={{ width: '12%' }} /> {/* 完了 */}
                        <col style={{ width: '12%' }} /> {/* 最終更新 */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th>製品番号</th>
                            <th>製品名</th>
                            <th>未回答</th>
                            <th>対応中</th>
                            <th>完了</th>
                            <th>最終更新</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((product) => (
                            <tr
                                key={product.id}
                                onClick={() => handleRowClick(product.id)}
                                className="product-row"
                            >
                                <td className="product-id">{product.id}</td>
                                <td className="product-name">{product.name}</td>
                                <td className="stat-cell unanswered">
                                    <span>{product.unanswered}</span>
                                </td>
                                <td className="stat-cell in-progress">
                                    <span>{product.inProgress}</span>
                                </td>
                                <td className="stat-cell completed">
                                    <span>{product.completed}</span>
                                </td>
                                <td className="updated-time">{product.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;