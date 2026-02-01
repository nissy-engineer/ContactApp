import React from 'react';
import { useParams } from 'react-router-dom';

const ThreadDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    return (
        <div style={{ padding: '32px' }}>
            <h1>スレッド詳細</h1>
            <p>製品番号: {productId}</p>
            <p>質問・回答のやり取りがここに表示されます</p>
        </div>
    );
};

export default ThreadDetail;