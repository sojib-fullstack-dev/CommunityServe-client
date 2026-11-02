import Image from "next/image";

const galleryItems = [
  {
    title: "Tree Plantation",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Road Cleaning",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Winter Clothes Distribution",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Food Distribution",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-16 cursor-pointer">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F97316]">
            Our Gallery
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#063E35]">
            Community Work in Action
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-5">
                <h3 className="text-center text-lg font-bold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
