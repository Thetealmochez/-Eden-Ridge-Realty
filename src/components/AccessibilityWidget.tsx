
import { useState } from "react";
import { Eye, Type, Moon, ArrowUp, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const AccessibilityWidget = () => {
  const [fontSize, setFontSize] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const increaseFontSize = () => {
    if (fontSize < 3) {
      const newSize = fontSize + 1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${100 + newSize * 10}%`;
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > -1) {
      const newSize = fontSize - 1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${100 + newSize * 10}%`;
    }
  };
  
  const resetFontSize = () => {
    setFontSize(0);
    document.documentElement.style.fontSize = "100%";
  };
  
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="fixed right-4 bottom-20 z-40">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className="rounded-full h-12 w-12 bg-luxury-navy text-white hover:bg-luxury-gold hover:text-luxury-navy"
              size="icon"
            >
              <Eye className="h-6 w-6" />
              <span className="sr-only">Accessibility Options</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center">Accessibility Options</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Text Size</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={decreaseFontSize}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span>{fontSize === 0 ? "Default" : fontSize > 0 ? `+${fontSize}` : fontSize}</span>
                  </div>
                  <Button variant="outline" size="icon" onClick={increaseFontSize}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetFontSize}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={highContrast ? "default" : "outline"}
                  className={highContrast ? "bg-luxury-gold text-luxury-navy" : ""}
                  onClick={toggleHighContrast}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  High Contrast
                </Button>
                <Button
                  variant={darkMode ? "default" : "outline"}
                  className={darkMode ? "bg-luxury-gold text-luxury-navy" : ""}
                  onClick={toggleDarkMode}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToTop}
                  className="col-span-2"
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Back to Top
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default AccessibilityWidget;
