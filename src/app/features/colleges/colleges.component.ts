import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  colleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      type: 'Engineering',
      location: 'New Delhi',
      established: 1961,
      ranking: 1,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      fees: '₹2.5 Lakhs/year',
      placement: '95%',
      avgPackage: '₹18 LPA',
      rating: 4.8,
      image: 'iit-delhi.jpg',
      featured: true,
      color: 'blue'
    },
    {
      id: 2,
      name: 'All India Institute of Medical Sciences',
      shortName: 'AIIMS Delhi',
      type: 'Medical',
      location: 'New Delhi',
      established: 1956,
      ranking: 1,
      courses: ['MBBS', 'MD', 'MS'],
      fees: '₹1.5 Lakhs/year',
      placement: '100%',
      avgPackage: '₹25 LPA',
      rating: 4.9,
      image: 'aiims-delhi.jpg',
      featured: true,
      color: 'red'
    },
    {
      id: 3,
      name: 'Indian Institute of Management Bangalore',
      shortName: 'IIM Bangalore',
      type: 'Management',
      location: 'Bangalore',
      established: 1973,
      ranking: 1,
      courses: ['MBA', 'PGDM', 'Executive MBA'],
      fees: '₹24 Lakhs/year',
      placement: '100%',
      avgPackage: '₹35 LPA',
      rating: 4.7,
      image: 'iim-bangalore.jpg',
      featured: true,
      color: 'green'
    },
    {
      id: 4,
      name: 'National Institute of Technology Trichy',
      shortName: 'NIT Trichy',
      type: 'Engineering',
      location: 'Tiruchirappalli',
      established: 1964,
      ranking: 8,
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      fees: '₹1.8 Lakhs/year',
      placement: '92%',
      avgPackage: '₹12 LPA',
      rating: 4.5,
      image: 'nit-trichy.jpg',
      featured: false,
      color: 'blue'
    },
    {
      id: 5,
      name: 'Manipal Academy of Higher Education',
      shortName: 'Manipal University',
      type: 'Multi-Disciplinary',
      location: 'Manipal',
      established: 1953,
      ranking: 15,
      courses: ['Engineering', 'Medical', 'Management'],
      fees: '₹3.5 Lakhs/year',
      placement: '85%',
      avgPackage: '₹8 LPA',
      rating: 4.3,
      image: 'manipal.jpg',
      featured: false,
      color: 'purple'
    },
    {
      id: 6,
      name: 'Vellore Institute of Technology',
      shortName: 'VIT Vellore',
      type: 'Engineering',
      location: 'Vellore',
      established: 1984,
      ranking: 12,
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      fees: '₹2.8 Lakhs/year',
      placement: '88%',
      avgPackage: '₹9.5 LPA',
      rating: 4.2,
      image: 'vit-vellore.jpg',
      featured: false,
      color: 'orange'
    }
  ];

  filters = {
    type: 'All',
    location: 'All',
    ranking: 'All'
  };

  filteredColleges = [...this.colleges];

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredColleges = this.colleges.filter(college => {
      return (this.filters.type === 'All' || college.type === this.filters.type) &&
             (this.filters.location === 'All' || college.location.includes(this.filters.location));
    });
  }

  getColorClasses(color: string) {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < Math.floor(rating));
  }
}
