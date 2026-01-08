const Header = () => {
  return (
    <header className="bg-card border-b border-border py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
          Dom Divino Congelados
        </h1>
        <p className="text-lg md:text-xl font-serif italic text-accent mb-3">
          feito em casa
        </p>
        <p className="text-muted-foreground text-sm md:text-base">
          Congelados artesanais preparados com carinho
        </p>
      </div>
    </header>
  );
};

export default Header;
