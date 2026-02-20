import { useEffect, useState, useRef } from "react";
import { categories } from "@/data/menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);

    
      const sections = categories.map((cat) => ({
        id: cat.id,
        el: document.getElementById(`category-${cat.id}`),
      }));

      const navHeight = navRef.current?.offsetHeight ?? 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= navHeight + 20) {
            setActiveCategory(section.id);
            return;
          }
        }
      }
      if (sections[0]?.el) {
        setActiveCategory(sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    if (el) {
      const navHeight = navRef.current?.offsetHeight ?? 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero section with logo and tagline */}
      <header
        className={`bg-card border-b border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isScrolled ? "max-h-0 py-0 border-b-0 opacity-0" : "max-h-60 py-8 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <img
            src="/logo.png"
            alt="Dom Divino Congelados"
            className="mx-auto mb-3 h-36 w-auto"
          />
        
        </div>
      </header>

      {/* Sticky navigation bar - hidden on mobile */}
      <nav
        ref={navRef}
        className={`hidden md:block sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 py-3 overflow-x-auto scrollbar-hide">
            {/* Compact logo shown when scrolled */}
            <div
              className={`flex-shrink-0 overflow-hidden transition-all duration-300 ${
                isScrolled ? "w-8 h-8 opacity-100 mr-2" : "w-0 h-0 opacity-0"
              }`}
            >
              <img
                src="/logo.png"
                alt="Dom Divino"
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* Category navigation pills */}
            <div className="flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
