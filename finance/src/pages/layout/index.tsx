import Header from '@/components/Header';
import Total from '@/components/Total';
import { TransactionsTable } from '@/components/TransactionsTable';

const Layout = () => {
  return (
    <main className='w-screen h-screen flex flex-col items-center justify-start'>
        <Header />
        <section>
            <Total />
        </section>
        <section className='w-full mt-20'>
            <TransactionsTable />
        </section>
    </main>
  );
};

export default Layout;
