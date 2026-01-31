import React from 'react';
import { MdOutlineQuestionAnswer, MdCheckCircleOutline } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import './Home.css';

// 仮データ
const stats = {
    unanswered: 4,
    inProgress: 7,
    completed: 23,
};

const recentIssues = [
    {
        id: 1,
        product: '製品A',
        title: 'ログイン画面の仕様について',
        author: '山田',
        assignee: '佐藤',
        status: 'inProgress',
        commentCount: 5,
        updatedAt: '2時間前',
    },
    {
        id: 2,
        product: '製品B',
        title: 'エラーメッセージの文言確認',
        author: '田中',
        assignee: null,
        status: 'unanswered',
        commentCount: 1,
        updatedAt: '1日前',
    },
    {
        id: 3,
        product: '製品A',
        title: 'データ保存タイミングについて',
        author: '鈴木',
        assignee: '佐藤',
        status: 'completed',
        commentCount: 8,
        updatedAt: '1週間前',
    },
    {
        id: 4,
        product: '製品C',
        title: 'パスワード桁数の制限',
        author: '山田',
        assignee: '高橋',
        status: 'inProgress',
        commentCount: 3,
        updatedAt: '3時間前',
    },
];

const Home: React.FC = () => {
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

    return (
        <div className="home-grid">
            {/* ヘッダー */}
            <header className="dashboard-header">
                <h1 className="page-title">ダッシュボード</h1>
            </header>

            {/* 統計カード */}
            <section className="stats-section">
                <div className="stat-card unanswered">
                    <MdOutlineQuestionAnswer className="stat-icon" />
                    <div className="stat-info">
                        <div className="stat-label">未回答</div>
                        <div className="stat-value">{stats.unanswered}件</div>
                    </div>
                </div>
                <div className="stat-card in-progress">
                    <BiLoaderCircle className="stat-icon" />
                    <div className="stat-info">
                        <div className="stat-label">対応中</div>
                        <div className="stat-value">{stats.inProgress}件</div>
                    </div>
                </div>
                <div className="stat-card completed">
                    <MdCheckCircleOutline className="stat-icon" />
                    <div className="stat-info">
                        <div className="stat-label">完了</div>
                        <div className="stat-value">{stats.completed}件</div>
                    </div>
                </div>
            </section>

            {/* 最近の問い合わせ */}
            <section className="recent-section">
                <h2 className="section-title">最近の問い合わせ</h2>
                <div className="issue-list">
                    {recentIssues.map((issue) => (
                        <article key={issue.id} className="issue-card">
                            <div className="issue-header">
                                {getStatusIcon(issue.status)}
                                <span className="issue-product">[{issue.product}]</span>
                                <span className="issue-title">{issue.title}</span>
                            </div>
                            <div className="issue-meta">
                                <span className="issue-author">
                                    {issue.author} → {issue.assignee || '未回答'}
                                </span>
                                <span className="issue-separator">|</span>
                                <span className="issue-comments">コメント: {issue.commentCount}件</span>
                                <span className="issue-separator">|</span>
                                <span className="issue-time">{issue.updatedAt}</span>
                            </div>
                        </article>
                    ))}
                </div>
                <button className="view-all-button">すべて見る</button>
            </section>
        </div>
    );
};

export default Home;