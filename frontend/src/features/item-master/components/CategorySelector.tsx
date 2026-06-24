'use client';

import { useState, useEffect, memo, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CategoryNode, categoryMasterData, getCategoryById, getAllItemsFromAllCategories, ItemWithCategory } from '../data/categoryMasterData';

interface CategorySelectorProps {
  onCategoryChange?: (categoryId: string, itemTypeId?: string, itemName?: string, categoryPath?: string) => void;
  initialCategoryId?: string;
  initialItemTypeId?: string;
  initialItemName?: string;
  disabled?: boolean;
}

const CategorySelector = memo(function CategorySelector({
  onCategoryChange,
  initialCategoryId,
  initialItemTypeId,
  initialItemName,
  disabled = false,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId || '');
  const [selectedItemType, setSelectedItemType] = useState<string>(initialItemTypeId || '');
  const [selectedItemName, setSelectedItemName] = useState<string>(() => {
    // Convert initialItemName to composite key format if initialItemTypeId is provided
    if (initialItemName && initialItemTypeId) {
      return `${initialItemTypeId}-${initialItemName}`;
    }
    return initialItemName || '';
  });
  const [allItems, setAllItems] = useState<ItemWithCategory[]>([]);
  const [categorySearch, setCategorySearch] = useState<string>('');
  const [itemSearch, setItemSearch] = useState<string>('');
  const [isItemDropdownOpen, setIsItemDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const itemSearchRef = useRef<HTMLInputElement>(null);
  const categorySearchRef = useRef<HTMLInputElement>(null);
  const categoryInputValueRef = useRef<string>('');
  const itemInputValueRef = useRef<string>('');

  const onCategoryChangeRef = useRef(onCategoryChange);
  onCategoryChangeRef.current = onCategoryChange;

  // Load all items on mount
  useEffect(() => {
    const items = getAllItemsFromAllCategories();
    setAllItems(items);
  }, []);

  // Auto-fill category when item is selected
  useEffect(() => {
    if (selectedItemName) {
      // Extract itemName from composite key (format: itemTypeId-itemName)
      // Split by '-' and take the last part as itemName, everything else as itemTypeId
      const parts = selectedItemName.split('-');
      const itemName = parts[parts.length - 1];
      const itemTypeId = parts.slice(0, parts.length - 1).join('-');
      const selectedItem = allItems.find(item => item.itemName === itemName && item.itemTypeId === itemTypeId);
      if (selectedItem) {
        // Extract main category ID from itemTypeId (first two segments: cat-1)
        const itemTypeIdParts = selectedItem.itemTypeId.split('-');
        const mainCategoryId = itemTypeIdParts.slice(0, 2).join('-');
        setSelectedCategory(mainCategoryId);
        setSelectedItemType(selectedItem.itemTypeId);
      } else {
        // Fallback: search by itemName only
        const fallbackItem = allItems.find(item => item.itemName === itemName);
        if (fallbackItem) {
          const itemTypeIdParts = fallbackItem.itemTypeId.split('-');
          const mainCategoryId = itemTypeIdParts.slice(0, 2).join('-');
          setSelectedCategory(mainCategoryId);
          setSelectedItemType(fallbackItem.itemTypeId);
        }
      }
    }
  }, [selectedItemName, allItems]);

  // Notify parent of changes
  useEffect(() => {
    let categoryPath = '';
    let actualItemName = selectedItemName;
    
    // Extract actual itemName from composite key if present
    if (selectedItemName && selectedItemName.includes('-')) {
      const parts = selectedItemName.split('-');
      actualItemName = parts[parts.length - 1];
    }
    
    if (selectedCategory) {
      const category = getCategoryById(selectedCategory);
      if (category) {
        categoryPath = category.name;
        if (selectedItemType) {
          const itemType = getCategoryById(selectedItemType);
          if (itemType) {
            categoryPath += ' > ' + itemType.name;
          }
        }
      }
    }
    onCategoryChangeRef.current?.(selectedCategory, selectedItemType, actualItemName, categoryPath);
  }, [selectedCategory, selectedItemType, selectedItemName]);

  const filteredCategories = categoryMasterData.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(itemSearch.toLowerCase());
    // Match if itemTypeId starts with selectedCategory (handles main category, subcategory, or item type)
    const matchesCategory = selectedCategory ? item.itemTypeId.startsWith(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    if (selectedItemName) {
      const parts = selectedItemName.split('-');
      const itemName = parts[parts.length - 1];
      const itemTypeId = parts.slice(0, parts.length - 1).join('-');
      const isValid = allItems.some(
        item =>
          item.itemName === itemName &&
          item.itemTypeId === itemTypeId &&
          item.itemTypeId.startsWith(categoryId)
      );

      if (!isValid) {
        setSelectedItemName('');
        setSelectedItemType('');
        setItemSearch('');
      }
    }
  };

  const selectedPath = (() => {
    if (!selectedCategory) return '';
    const category = getCategoryById(selectedCategory);
    if (!category) return '';
    let path = category.name;
    if (selectedItemType) {
      const itemType = getCategoryById(selectedItemType);
      if (itemType) path += ` > ${itemType.name}`;
    }
    return path;
  })();

  return (
    <div className="space-y-3">
      {/* Category Selection */}
      <div>
        <Label htmlFor="category">Category *</Label>
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          onOpenChange={(open) => {
            setIsCategoryDropdownOpen(open);
            if (open && categorySearchRef.current) {
              setTimeout(() => categorySearchRef.current?.focus(), 0);
            }
          }}
          open={isCategoryDropdownOpen}
          disabled={disabled}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Search and select category" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2 sticky top-0 bg-background z-10" onPointerDown={(e) => e.preventDefault()}>
              <Input
                ref={categorySearchRef}
                placeholder="Search categories..."
                defaultValue={categorySearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                  setCategorySearch(e.target.value);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="mb-2"
                autoComplete="off"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-muted-foreground">
                  No categories found
                </div>
              )}
            </div>
          </SelectContent>
        </Select>
        {selectedPath && (
          <p className="text-xs text-muted-foreground mt-1">{selectedPath}</p>
        )}
      </div>

      {/* Item Selection */}
      <div>
        <Label htmlFor="item">Item *</Label>
        <Select
          value={selectedItemName}
          onValueChange={setSelectedItemName}
          onOpenChange={(open) => {
            setIsItemDropdownOpen(open);
            if (open && itemSearchRef.current) {
              setTimeout(() => itemSearchRef.current?.focus(), 0);
            }
          }}
          open={isItemDropdownOpen}
          disabled={disabled}
        >
          <SelectTrigger id="item">
            <SelectValue placeholder="Search and select item" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2 sticky top-0 bg-background z-10" onPointerDown={(e) => e.preventDefault()}>
              <Input
                ref={itemSearchRef}
                placeholder="Search items..."
                defaultValue={itemSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                  setItemSearch(e.target.value);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="mb-2"
                autoComplete="off"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <SelectItem key={`${item.categoryId}-${item.itemTypeId}-${item.itemName}`} value={`${item.itemTypeId}-${item.itemName}`}>
                    {item.itemName}
                  </SelectItem>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-muted-foreground">
                  No items found
                </div>
              )}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});

export { CategorySelector };
