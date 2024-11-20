'use client';

import { useReservation } from './ReservationContext';

function ReservationForm({ cabin }) {
  // CHANGE
  const { maxCapacity } = cabin;
  const { range } = useReservation();

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800  text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>



        {/* <div className='flex gap-4 items-center'>
			<img // Important to display google profile images referrerPolicy='no-referrer' className='h-8 rounded-full'
				src={user.image} alt={user.name} />
			<p>{user.name}</p>
		</div> */}
      </div>

      <form className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

import ReservationCard from '@/app/_components/ReservationCard';
import { auth } from '@/app/_lib/auth';
import { getBookings } from '@/app/_lib/data-service';
export const metadata = {
  title: 'Reservations',
};

const session = await auth();
const bookings = await getBookings(session.user.guestId);

return (
  <div>
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Your reservations
    </h2>

    {bookings.length === 0 ? (
      <p className="text-lg">
        You have no reservations yet. Check out our{' '}
        <a className="underline text-accent-500" href="/cabins">
          luxury cabins &rarr;
        </a>
      </p>
    ) : (
      <ul className="space-y-6">
        {bookings.map((booking) => (
          <ReservationCard booking={booking} key={booking.id} />
        ))}
      </ul>
    )}
  </div>
);

('use client');
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? 'bg-primary-900' : ''
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
