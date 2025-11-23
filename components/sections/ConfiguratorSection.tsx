import React, { useState, useEffect } from 'react';
import { CAR_MODELS } from '../../constants';
import { 
  ChevronRight, 
  RotateCw, 
  Lightbulb,
  CloudRain,
  Info, 
  Package, 
  DollarSign, 
  ShieldAlert, 
  Share2, 
  Check, 
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  FileText,
  CalendarCheck,
  ArrowLeft,
  Save
} from 'lucide-react';
import { CarModel, CarTrim, CarColor } from '../../types';

interface ConfiguratorSectionProps {
    onClose?: () => void;
}

const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({ onClose }) => {
  const [selectedModel, setSelectedModel] = useState<CarModel>(CAR_MODELS[0]);
  const [selectedTrim, setSelectedTrim] = useState<CarTrim>(CAR_MODELS[0].trims[0]);
  const [selectedColor, setSelectedColor] = useState<CarColor>(CAR_MODELS[0].colors[0]);
  const [selectedInterior, setSelectedInterior] = useState<CarColor>(CAR_MODELS[0].interiorColors[0]);
  
  const [viewType, setViewType] = useState<'exterior' | 'interior'>('exterior');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<'trim' | 'exterior' | 'interior' | 'summary'>('trim');
  
  // Interactive Feature States
  const [lightsOn, setLightsOn] = useState(false);
  const [showKspHotspots, setShowKspHotspots] = useState(false);

  // Reset function when model changes
  useEffect(() => {
    setSelectedTrim(selectedModel.trims[0]);
    setSelectedColor(selectedModel.colors[0]);
    setSelectedInterior(selectedModel.interiorColors[0]);
    setViewType('exterior');
    setActiveAccordion('trim');
  }, [selectedModel]);

  // Formatting currency (USD for Porsche context)
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const totalPrice = selectedModel.basePrice + selectedTrim.priceOffset + selectedColor.priceOffset + selectedInterior.priceOffset;
  const monthlyPayment = totalPrice / 60 * 1.04; // Mock financing

  // Save Configuration Handler
  const handleSaveConfiguration = () => {
    const defaultName = `${selectedModel.name} ${selectedTrim.name} - ${new Date().toLocaleTimeString()}`;
    const name = window.prompt("Save Configuration As:", defaultName);
    
    if (name) {
        const config = {
            id: Date.now().toString(),
            name,
            timestamp: Date.now(),
            modelId: selectedModel.id,
            trimId: selectedTrim.id,
            exteriorColorId: selectedColor.id,
            interiorColorId: selectedInterior.id,
            totalPrice
        };

        try {
            const existing = JSON.parse(localStorage.getItem('dealer365_saved_configs') || '[]');
            localStorage.setItem('dealer365_saved_configs', JSON.stringify([...existing, config]));
            alert(`Configuration "${name}" saved successfully!`);
        } catch (e) {
            console.error("Failed to save configuration", e);
            alert("Failed to save configuration. Storage might be full.");
        }
    }
  };

  // Mock Hotspots
  const hotspots = viewType === 'exterior' ? [
    { id: 1, x: '20%', y: '55%', label: 'Matrix LED Headlights' },
    { id: 2, x: '50%', y: '60%', label: 'Ceramic Composite Brakes' },
    { id: 3, x: '80%', y: '45%', label: 'Active Aerodynamics' },
  ] : [
    { id: 4, x: '50%', y: '40%', label: 'Porsche Communication Management' },
    { id: 5, x: '30%', y: '70%', label: '18-Way Sport Seats' },
  ];

  return (
    // Changed to h-screen to fill viewport without padding/rounding
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden flex flex-col md:flex-row">
      
      {/* ====================================================================================
          LAYER 1: IMMERSIVE VISUALIZER (Full Screen Background)
         ==================================================================================== */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-200 to-slate-400">
        {/* Background Environment - Simplified Studio Look */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-200 to-slate-400 opacity-80"></div>
        
        {/* 3D Car Image */}
        <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-20 transition-all duration-700 ease-in-out">
            <img 
                src={viewType === 'exterior' ? selectedModel.image : (selectedModel.interiorImage || selectedModel.image)} 
                alt={selectedModel.name} 
                className={`
                    max-w-none w-[140%] md:w-[90%] lg:w-[85%] object-contain drop-shadow-2xl transition-all duration-500
                    ${isPanelOpen ? 'lg:translate-x-[-15%]' : 'translate-x-0'} 
                    ${lightsOn ? 'brightness-110 drop-shadow-[0_0_50px_rgba(255,255,255,0.8)]' : ''}
                `}
            />

            {/* Hotspots */}
            {showKspHotspots && hotspots.map(spot => (
                <div 
                    key={spot.id}
                    className="absolute w-8 h-8 rounded-full border-2 border-white/80 shadow-[0_0_15px_rgba(234,88,12,0.6)] cursor-pointer flex items-center justify-center group z-10 animate-pulse bg-ds-primary/80"
                    style={{ left: spot.x, top: spot.y }}
                >
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm border border-white/10 pointer-events-none">
                        {spot.label}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* ====================================================================================
          LAYER 2: FLOATING UI CONTROLS (Glassmorphism)
         ==================================================================================== */}

      {/* 2.1 Top Left: Branding & Model Selector */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-4">
        {/* Back Button added for Quick Exit */}
        {onClose && (
            <button 
                onClick={onClose}
                className="flex items-center gap-2 text-ds-textMain font-medium hover:text-ds-primary transition-colors mb-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-lg w-fit"
            >
                <ArrowLeft size={16} />
                <span className="text-sm">Dashboard</span>
            </button>
        )}

        <div className="glass-panel p-4 rounded-2xl shadow-ds-glass flex items-center gap-4 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-ds-textMain tracking-tight leading-none">{selectedModel.name}</h1>
                <p className="text-sm text-ds-textMuted font-medium mt-1">{selectedModel.slogan}</p>
            </div>
            <div className="h-10 w-px bg-gray-300 mx-2"></div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-ds-textMuted tracking-wider">Starting At</span>
                <span className="text-lg font-bold text-ds-primary">{formatCurrency(selectedModel.basePrice)}</span>
            </div>
        </div>
        
        {/* Model Switcher - Mini Thumbnails */}
        <div className="flex gap-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {CAR_MODELS.map(m => (
                <button 
                    key={m.id} 
                    onClick={() => setSelectedModel(m)}
                    className={`w-16 h-12 rounded-lg border-2 overflow-hidden transition-all shadow-md relative group
                    ${selectedModel.id === m.id ? 'border-ds-primary ring-2 ring-ds-primary/30 scale-105' : 'border-white/50 opacity-80 hover:opacity-100 hover:scale-105'}`}
                >
                    <img src={m.image} className="w-full h-full object-cover bg-white" />
                </button>
            ))}
        </div>
      </div>

      {/* 2.2 Top Center: View Toggles */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
         <div className="glass-panel p-1 rounded-full shadow-lg flex">
            <button 
                onClick={() => setViewType('exterior')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                ${viewType === 'exterior' ? 'bg-ds-sidebar text-white shadow-md' : 'text-slate-600 hover:bg-black/5'}`}
            >
                Exterior
            </button>
            <button 
                onClick={() => setViewType('interior')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                ${viewType === 'interior' ? 'bg-ds-sidebar text-white shadow-md' : 'text-slate-600 hover:bg-black/5'}`}
            >
                Interior
            </button>
         </div>
      </div>

      {/* 2.3 Bottom Center: Interactive Features */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
         <div className="glass-panel px-4 py-2 rounded-2xl shadow-ds-float flex items-center gap-4">
            <button 
                onClick={() => setLightsOn(!lightsOn)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 group ${lightsOn ? 'bg-amber-100 text-amber-600' : 'hover:bg-slate-100 text-slate-500'}`}
            >
                <Lightbulb size={20} className={lightsOn ? "fill-current" : ""} />
                <span className="text-[9px] font-bold uppercase">Lights</span>
            </button>
            <button 
                onClick={() => setShowKspHotspots(!showKspHotspots)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 group ${showKspHotspots ? 'bg-ds-primary/10 text-ds-primary' : 'hover:bg-slate-100 text-slate-500'}`}
            >
                <Info size={20} />
                <span className="text-[9px] font-bold uppercase">Info</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-all w-16">
                <RotateCw size={20} />
                <span className="text-[9px] font-bold uppercase">360°</span>
            </button>
         </div>
      </div>

      {/* 2.4 Right Panel: Floating Configuration Deck */}
      <div className={`
          absolute top-4 bottom-4 right-4 z-30 transition-all duration-500 ease-out flex flex-col gap-3
          ${isPanelOpen ? 'w-[380px] translate-x-0' : 'w-[60px] translate-x-0'}
      `}>
          
          {/* Collapse Toggle Button */}
          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="self-end p-3 glass-panel rounded-xl shadow-md text-ds-textMain hover:text-ds-primary transition-colors mb-auto"
          >
             {isPanelOpen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>

          {/* MAIN PANEL CONTENT (Only visible when open) */}
          {isPanelOpen && (
              <div className="flex-1 glass-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn border-t border-white/50">
                  
                  {/* Panel Header */}
                  <div className="p-5 border-b border-gray-200/50 bg-white/40 backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-ds-textMain flex items-center gap-2">
                        Configure Your {selectedModel.name}
                      </h3>
                      <div className="flex justify-between items-end mt-2">
                          <span className="text-xs text-ds-textMuted font-medium uppercase tracking-wider">Estimated Price</span>
                          <span className="text-xl font-bold text-ds-primary">{formatCurrency(totalPrice)}</span>
                      </div>
                  </div>

                  {/* Scrollable Accordions */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                      
                      {/* 1. TRIM LEVEL */}
                      <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${activeAccordion === 'trim' ? 'bg-white/80 border-ds-primary shadow-sm' : 'bg-white/40 border-transparent hover:bg-white/60'}`}>
                          <button 
                            onClick={() => setActiveAccordion('trim')}
                            className="w-full p-4 flex justify-between items-center text-left"
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeAccordion === 'trim' ? 'bg-ds-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                                  <span className="font-bold text-sm text-ds-textMain">Trim Level</span>
                              </div>
                              <span className="text-xs font-medium text-ds-primary">{selectedTrim.name}</span>
                          </button>
                          
                          {activeAccordion === 'trim' && (
                              <div className="px-4 pb-4 space-y-2 animate-fadeIn">
                                  {selectedModel.trims.map(trim => (
                                      <div 
                                        key={trim.id}
                                        onClick={() => setSelectedTrim(trim)}
                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedTrim.id === trim.id ? 'border-ds-primary bg-orange-50/50' : 'border-gray-200 hover:border-orange-200'}`}
                                      >
                                          <div className="flex justify-between items-center mb-1">
                                              <span className="font-bold text-sm">{trim.name}</span>
                                              <span className="text-xs font-bold">{trim.priceOffset > 0 ? `+${formatCurrency(trim.priceOffset)}` : 'Base'}</span>
                                          </div>
                                          <div className="flex gap-2 flex-wrap">
                                              {trim.features.slice(0, 2).map((f,i) => <span key={i} className="text-[9px] bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-500">{f}</span>)}
                                          </div>
                                          {/* Agent Data Included in View */}
                                          <div className="mt-2 pt-2 border-t border-gray-200/50 flex justify-between text-[10px] text-gray-500">
                                              <span className="flex items-center gap-1"><Package size={10}/> Stock: {trim.stockCount}</span>
                                              <span className="flex items-center gap-1"><DollarSign size={10}/> GP: {trim.margin}</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>

                      {/* 2. EXTERIOR */}
                      <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${activeAccordion === 'exterior' ? 'bg-white/80 border-ds-primary shadow-sm' : 'bg-white/40 border-transparent hover:bg-white/60'}`}>
                          <button 
                            onClick={() => { setActiveAccordion('exterior'); setViewType('exterior'); }}
                            className="w-full p-4 flex justify-between items-center text-left"
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeAccordion === 'exterior' ? 'bg-ds-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                                  <span className="font-bold text-sm text-ds-textMain">Paint</span>
                              </div>
                              <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: selectedColor.hex }}></div>
                          </button>
                          
                          {activeAccordion === 'exterior' && (
                              <div className="px-4 pb-4 animate-fadeIn">
                                  <div className="grid grid-cols-4 gap-3">
                                      {selectedModel.colors.map(color => (
                                          <button
                                              key={color.id}
                                              onClick={() => setSelectedColor(color)}
                                              className={`relative group flex flex-col items-center gap-1`}
                                          >
                                              <div 
                                                  className={`w-12 h-12 rounded-full shadow-sm border-2 transition-transform hover:scale-105 ${selectedColor.id === color.id ? 'border-ds-primary ring-2 ring-ds-primary/20' : 'border-white'}`}
                                                  style={{ backgroundColor: color.hex }}
                                              >
                                                  {selectedColor.id === color.id && <Check size={16} className="absolute inset-0 m-auto text-white drop-shadow-md" />}
                                              </div>
                                              <span className="text-[9px] font-medium text-ds-textMuted truncate w-full text-center">{color.name}</span>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>

                       {/* 3. INTERIOR */}
                       <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${activeAccordion === 'interior' ? 'bg-white/80 border-ds-primary shadow-sm' : 'bg-white/40 border-transparent hover:bg-white/60'}`}>
                          <button 
                            onClick={() => { setActiveAccordion('interior'); setViewType('interior'); }}
                            className="w-full p-4 flex justify-between items-center text-left"
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeAccordion === 'interior' ? 'bg-ds-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                                  <span className="font-bold text-sm text-ds-textMain">Interior</span>
                              </div>
                              <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: selectedInterior.hex }}></div>
                          </button>
                          
                          {activeAccordion === 'interior' && (
                              <div className="px-4 pb-4 animate-fadeIn">
                                  <div className="grid grid-cols-2 gap-3">
                                      {selectedModel.interiorColors.map(color => (
                                          <button
                                              key={color.id}
                                              onClick={() => setSelectedInterior(color)}
                                              className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${selectedInterior.id === color.id ? 'border-ds-primary bg-white' : 'border-transparent hover:bg-white/50'}`}
                                          >
                                              <div 
                                                  className="w-8 h-8 rounded-full border shadow-sm shrink-0"
                                                  style={{ backgroundColor: color.hex }}
                                              ></div>
                                              <div className="text-left overflow-hidden">
                                                  <div className="text-xs font-bold text-ds-textMain truncate">{color.name}</div>
                                                  <div className="text-[10px] text-ds-textMuted">{color.priceOffset > 0 ? `+${formatCurrency(color.priceOffset)}` : 'Included'}</div>
                                              </div>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>

                  </div>

                  {/* Summary & Actions Footer */}
                  <div className="p-5 bg-white/60 backdrop-blur-md border-t border-white space-y-3">
                       <div className="flex justify-between items-center text-xs font-medium text-ds-textMuted">
                           <span>Est. Payment</span>
                           <span className="text-ds-textMain font-bold">{formatCurrency(monthlyPayment)} /mo</span>
                       </div>
                       
                       {/* Action Buttons Grid */}
                       <div className="grid grid-cols-3 gap-2">
                           <button 
                                onClick={handleSaveConfiguration}
                                className="py-3 rounded-xl border border-ds-border bg-white text-ds-textMain font-bold text-xs hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1"
                           >
                               <Save size={14}/> Save
                           </button>
                           <button className="py-3 rounded-xl border border-ds-border bg-white text-ds-textMain font-bold text-xs hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1">
                               <FileText size={14}/> Quote
                           </button>
                           <button className="py-3 rounded-xl bg-ds-primary text-white font-bold text-xs hover:bg-ds-primaryDark shadow-lg shadow-orange-200 transition-all flex flex-col items-center justify-center gap-1">
                               <CalendarCheck size={14}/> Order
                           </button>
                       </div>
                  </div>
              </div>
          )}
      </div>

    </div>
  );
};

export default ConfiguratorSection;