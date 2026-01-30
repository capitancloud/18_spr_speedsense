/**
 * Footer - SpeedSense footer
 */

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-primary">Speed</span>Sense
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Un progetto educativo per capire la performance web.
            <br />
            <span className="text-primary">La velocità percepita è la vera velocità.</span>
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Made with ⚡ for learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
