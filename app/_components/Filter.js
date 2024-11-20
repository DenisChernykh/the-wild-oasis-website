'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';
  const filters = [
    {
      label: 'all',
      filter: 'all',
    },
    { label: '1—3 guests', filter: 'small' },
    { label: '4—7 guests', filter: 'medium' },
    { label: '8—   12 guests', filter: 'large' },
  ];

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {filters.map(({ label, filter }) => (
        <Button
          key={filter}
          onFilter={handleFilter}
          activeFilter={activeFilter}
          filter={filter}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

function Button({ onFilter, children, filter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => onFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
