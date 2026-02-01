import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineQuestionAnswer, MdCheckCircleOutline } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import './ThreadList.css';

// スレッドのデータ型定義
interface Thread {
    id: number;
    title: string;
    author: string;
    assignee: string | null;
    status: 'unanswered' | 'inProgress' | 'completed';
    commentCount: number;
    updatedAt: string;
}

// 仮データ
const threads: Thread[] = [
    { id: 1, title: 'ログイン画面の仕様について', author: '山田', assignee: '佐藤', status: 'inProgress', commentCount: 5, updatedAt: '2時間前' },
    { id: 2, title: 'セッション切れのタイミング', author: '鈴木', assignee: null, status: 'unanswered', commentCount: 1, updatedAt: '1日前' },
    { id: 3, title: 'データ保存タイミングについて', author: '鈴木', assignee: '佐藤', status: 'completed', commentCount: 8, updatedAt: '1週間前' },
    { id: 4, title: 'エラーログの出力形式', author: '田中', assignee: '高橋', status: 'inProgress', commentCount: 3, updatedAt: '3時間前' },
    { id: 5, title: 'ダッシュボードの表示件数制限', author: '山田', assignee: null, status: 'unanswered', commentCount: 0, updatedAt: '5時間前' },
    { id: 6, title: '検索機能のキャッシュ対策', author: '佐藤', assignee: '高橋', status: 'inProgress', commentCount: 2, updatedAt: '半日前' },
    { id: 7, title: 'CSVエクスポート時の文字コード', author: '田中', assignee: '佐藤', status: 'completed', commentCount: 6, updatedAt: '2日前' },
    { id: 8, title: '通知メールの送信タイミング', author: '鈴木', assignee: null, status: 'unanswered', commentCount: 1, updatedAt: '4時間前' },
    { id: 9, title: 'ユーザー権限の変更フロー', author: '高橋', assignee: '山田', status: 'inProgress', commentCount: 4, updatedAt: '1時間前' },
    { id: 10, title: 'テスト環境のデータリセット手順', author: '田中', assignee: '鈴木', status: 'completed', commentCount: 9, updatedAt: '3日前' },
    { id: 11, title: 'API レスポンス速度の改善', author: '佐藤', assignee: '高橋', status: 'inProgress', commentCount: 3, updatedAt: '6時間前' },
    { id: 12, title: 'ログイン失敗時のアカウントロック仕様', author: '山田', assignee: null, status: 'unanswered', commentCount: 0, updatedAt: '8時間前' },
    { id: 13, title: 'バックアップ runs の間隔について', author: '鈴木', assignee: '佐藤', status: 'completed', commentCount: 5, updatedAt: '1週間前' },
    { id: 14, title: 'モバイル表示でのレイアウト崩れ', author: '田中', assignee: '高橋', status: 'inProgress', commentCount: 2, updatedAt: '2時間前' },
];

// フィルタボタンの定義
const filters = [
    { key: 'all', label: '全件' },
    { key: 'unanswered', label: '未回答' },
    { key: 'inProgress', label: '対応中' },
    { key: 'completed', label: '完了' },
] as const;


const ThreadList: React.FC = () => {
    
    // ルートパラメータとナビゲーション
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    // フィルタ・検索の状態管理
    const [activeFilter, setActiveFilter] = useState<'all' | 'unanswered' | 'inProgress' | 'completed'>('all');
    const [searchText, setSearchText] = useState('');
    const [appliedSearchText, setAppliedSearchText] = useState('');

    // スレッド一覧の絞り込み
    const filteredThreads = threads
        .filter((thread) => activeFilter === 'all' || thread.status === activeFilter)
        .filter((thread) => thread.title.includes(appliedSearchText));

    // 検索ボタン押下時の処理
    const handleSearch = () => {
        setAppliedSearchText(searchText);
    };

    // ステータスに応じたアイコンの返却
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'unanswered':
                return <MdOutlineQuestionAnswer className="status-icon unanswered" />;
            case 'inProgress':
                return <BiLoaderCircle className="status-icon in-progress" />;
            case 'completed':
                return <MdCheckCircleOutline className="status-icon completed" />;
            default:
                return <MdOutlineQuestionAnswer className="status-icon" />;
        }
    };

    // スレッドカード押下
    const handleThreadClick = (threadId: number) => {
        navigate(`/products/${productId}/threads/${threadId}`);
    };

    return (
        <div className="thread-list-container">
            <header className="page-header">
                <h1 className="page-title">{productId} - スレッド一覧</h1>
            </header>

            <button className="new-thread-button">新規作成</button>

            <div className="filter-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="タイトルで検索..."
                        className="search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>検索</button>
                </div>
                <div className="filter-buttons">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            className={`filter-button ${activeFilter === filter.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.key)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="thread-list">
                {filteredThreads.map((thread) => (
                    <article
                        key={thread.id}
                        className="thread-card"
                        onClick={() => handleThreadClick(thread.id)}
                    >
                        <div className="thread-header">
                            {getStatusIcon(thread.status)}
                            <span className="thread-title">{thread.title}</span>
                        </div>
                        <div className="thread-meta">
                            <span className="thread-author">
                                {thread.author} → {thread.assignee || '未割り当て'}
                            </span>
                            <span className="thread-separator">|</span>
                            <span className="thread-comments">コメント: {thread.commentCount}件</span>
                            <span className="thread-separator">|</span>
                            <span className="thread-time">{thread.updatedAt}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ThreadList;