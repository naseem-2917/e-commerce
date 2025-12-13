import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const MOCK_ORDERS = [
    {
        id: 'ORD-2024-1001',
        date: '2024-03-10',
        total: 15495,
        status: 'Delivered',
        items: [
            { name: 'Sony WH-1000XM5', quantity: 1, price: 15495 }
        ]
    },
    {
        id: 'ORD-2024-1002',
        date: '2024-03-12',
        total: 8995,
        status: 'Processing',
        items: [
            { name: 'Logitech MX Master 3S', quantity: 1, price: 8995 }
        ]
    },
    {
        id: 'ORD-2024-1003',
        date: '2024-03-15',
        total: 13995,
        status: 'Shipped',
        items: [
            { name: 'Nike Air Max 270', quantity: 1, price: 13995 }
        ]
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Delivered':
            return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
        case 'Processing':
            return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
        case 'Shipped':
            return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
        default:
            return 'text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Delivered':
            return <CheckCircle size={16} />;
        case 'Processing':
            return <Clock size={16} />;
        case 'Shipped':
            return <Truck size={16} />;
        default:
            return <Package size={16} />;
    }
};

export default function Orders() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Your Orders</h1>

            <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Order ID</p>
                                <p className="font-mono font-medium text-slate-900 dark:text-white">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                                <p className="font-medium text-slate-900 dark:text-white">{order.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total Amount</p>
                                <p className="font-bold text-slate-900 dark:text-white">₹{order.total.toLocaleString()}</p>
                            </div>
                            <div>
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Items</h3>
                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                                        <span>{item.name} <span className="text-slate-400">x{item.quantity}</span></span>
                                        <span className="font-medium">₹{item.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
