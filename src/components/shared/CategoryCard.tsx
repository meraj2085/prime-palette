import Link from "next/link";

const CategoryCard = ({ card }: any) => {
  return (
    <Link href={`/services`}>
      <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6">
        <div className="flex gap-4 align-middle">
          <span className="inline-block rounded bg-[#8786C6] p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-palette"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"></path>
              <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
          </span>
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {card?.name}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
