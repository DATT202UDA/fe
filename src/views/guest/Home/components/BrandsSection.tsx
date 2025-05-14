import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const brands = [
  { id: 1, name: 'Samsung', logo: '/images/brands/samsung.png' },
  { id: 2, name: 'LG', logo: '/images/brands/lg.png' },
  { id: 3, name: 'Panasonic', logo: '/images/brands/panasonic.png' },
  { id: 4, name: 'Electrolux', logo: '/images/brands/electrolux.png' },
  { id: 5, name: 'Sharp', logo: '/images/brands/sharp.png' },
];

export const BrandsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#7A5C3E] mb-3 md:mb-4">
            Thương hiệu nổi bật
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Hợp tác với các thương hiệu uy tín hàng đầu
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                href={`/brands/${brand.id}`}
                className="block bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-16 md:h-20 w-full">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-sm md:text-base font-medium text-gray-600 group-hover:text-[#B86B2B] transition-colors duration-300">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
