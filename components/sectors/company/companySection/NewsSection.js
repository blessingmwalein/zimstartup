import Link from 'next/link';
import React from 'react';

const NewsSection = ({ news }) => {
  return (
    <div className='m-3 md:m-4'>
      {news?.map((e) => (
        <div key={e.update_id} className="bg-white p-4 mb-4 mx-2 md:mx-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">{e.headline}</h3>
          <p className="text-sm text-gray-500">
            Published: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm text-gray-500">Status: {e.is_published ? 'Published' : 'Unpublished'}</p>
          
          <hr className="my-4" />

          <h4 className="text-xl font-semibold">Summary</h4>
          <p className="text-gray-700 mb-2">{e.summary}</p>

          <h4 className="text-xl font-semibold">Update Content</h4>
          <p className="text-gray-700 mb-4">{e.update_content}</p>

          <div className="mt-4">
            <span className="font-semibold">Discover More: </span>
            <Link
              className="text-blue-500 hover:underline"
              href={e.url}
            >
              {e.url}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;