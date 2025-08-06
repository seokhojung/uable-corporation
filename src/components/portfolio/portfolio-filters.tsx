// src/components/portfolio/portfolio-filters.tsx
'use client'

import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PortfolioFilters as PortfolioFiltersType, PORTFOLIO_CATEGORIES, TECHNOLOGIES, PortfolioCategory } from '@/types/portfolio'

interface PortfolioFiltersProps {
  filters: PortfolioFiltersType
  onFiltersChange: (filters: PortfolioFiltersType) => void
  totalProjects: number
  filteredCount: number
}

export const PortfolioFilters = ({ 
  filters, 
  onFiltersChange, 
  totalProjects, 
  filteredCount 
}: PortfolioFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(filters.search || '')

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onFiltersChange({ ...filters, search: query })
  }

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters }
    if (newFilters.category === category) {
      delete newFilters.category
    } else {
      newFilters.category = category
    }
    onFiltersChange(newFilters)
  }

  const handleTechnologyChange = (tech: string) => {
    const newFilters = { ...filters }
    const technologies = newFilters.technologies || []
    
    if (technologies.includes(tech)) {
      newFilters.technologies = technologies.filter((t: string) => t !== tech)
    } else {
      newFilters.technologies = [...technologies, tech]
    }
    
    if (newFilters.technologies?.length === 0) {
      delete newFilters.technologies
    }
    
    onFiltersChange(newFilters)
  }

  const handleSortChange = (sortBy: 'newest' | 'oldest' | 'featured') => {
    onFiltersChange({ ...filters, sortBy })
  }

  const clearFilters = () => {
    setSearchQuery('')
    onFiltersChange({ sortBy: 'newest' })
  }

  const hasActiveFilters = filters.category || filters.technologies?.length || filters.search

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 헤더 - The Architect 정밀한 레이아웃 */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* 검색 - The Tactile 글래스모피즘 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500/50 transition-all duration-300 placeholder:text-slate-400 text-slate-100"
          />
        </div>

        {/* 필터 토글 및 카운터 */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-300">
            <span className="text-slate-200 font-semibold">{filteredCount}</span> / {totalProjects} 프로젝트
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-slate-800/70 border-slate-700/30 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Filter className="w-4 h-4" />
            필터
            {showFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 활성 필터 표시 - The Tactile 글래스모피즘 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-700/50 border border-slate-600/50 rounded-xl shadow-md">
          <span className="text-sm font-semibold text-slate-200">활성 필터:</span>
          
          {filters.category && (
            <Badge variant="secondary" className="text-xs">
              {PORTFOLIO_CATEGORIES.find(c => c.value === filters.category)?.label}
              <button
                onClick={() => handleCategoryChange(filters.category!)}
                className="ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.technologies?.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
              <button
                onClick={() => handleTechnologyChange(tech)}
                className="ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          {filters.search && (
            <Badge variant="secondary" className="text-xs">
              검색: {filters.search}
              <button
                onClick={() => handleSearchChange('')}
                className="ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          <Button size="sm" variant="ghost" onClick={clearFilters}>
            모두 지우기
          </Button>
        </div>
      )}

      {/* 확장된 필터 패널 */}
      {showFilters && (
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700 mt-4 transition-all duration-300">
      
            <div className="grid md:grid-cols-3 gap-6">
              {/* 카테고리 필터 */}
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">카테고리</h4>
                <div className="space-y-2">
                  {PORTFOLIO_CATEGORIES.map((category: PortfolioCategory) => (
                    <label key={category.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.category === category.value}
                        onChange={() => handleCategoryChange(category.value)}
                        className="rounded border-slate-600 text-slate-400 focus:ring-slate-500 bg-slate-700"
                      />
                      <span className="text-sm text-slate-200">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 기술 스택 필터 */}
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">기술 스택</h4>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {TECHNOLOGIES.map((tech: string) => (
                    <label key={tech} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.technologies?.includes(tech) || false}
                        onChange={() => handleTechnologyChange(tech)}
                        className="rounded border-slate-600 text-slate-400 focus:ring-slate-500 bg-slate-700"
                      />
                      <span className="text-sm text-slate-200">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 정렬 옵션 */}
              <div>
                <h4 className="font-semibold text-slate-100 mb-3">정렬</h4>
                <div className="space-y-2">
                  {[
                    { value: 'newest', label: '최신순' },
                    { value: 'oldest', label: '오래된순' },
                    { value: 'featured', label: '추천순' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sort"
                        checked={filters.sortBy === option.value}
                        onChange={() => handleSortChange(option.value as 'newest' | 'oldest' | 'featured')}
                        className="border-slate-600 text-slate-400 focus:ring-slate-500 bg-slate-700"
                      />
                      <span className="text-sm text-slate-200">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  )
} 