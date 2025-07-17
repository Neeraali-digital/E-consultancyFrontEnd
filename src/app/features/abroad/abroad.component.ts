import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-abroad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './abroad.component.html',
  styleUrls: ['./abroad.component.css']
})
export class AbroadComponent implements OnInit {

  selectedCountry: string | null = null;
  
  countries = [
    {
      name: 'Georgia',
      code: 'georgia',
      flag: 'https://flagcdn.com/w80/ge.png',
      highlights: [
        'No Entrance Exam Required',
        'Affordable Medical Education',
        'European Standard Education',
        'Safe & Peaceful Environment'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$4,000/year' },
        { name: 'BDS', duration: '5 Years', fees: '$3,500/year' },
        { name: 'Engineering', duration: '4 Years', fees: '$3,000/year' }
      ],
      colleges: [
        {
          name: 'Tbilisi State Medical University',
          ranking: '#1 in Georgia',
          established: '1918',
          image: 'college-georgia-1.jpg'
        },
        {
          name: 'Georgian American University',
          ranking: '#2 in Georgia',
          established: '2005',
          image: 'college-georgia-2.jpg'
        }
      ]
    },
    {
      name: 'Russia',
      code: 'russia',
      flag: 'https://flagcdn.com/w80/ru.png',
      highlights: [
        'World-Class Universities',
        'Research Excellence',
        'Rich Cultural Heritage',
        'Affordable Living Costs'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$5,000/year' },
        { name: 'Engineering', duration: '4 Years', fees: '$4,000/year' },
        { name: 'MBA', duration: '2 Years', fees: '$6,000/year' }
      ],
      colleges: [
        {
          name: 'Moscow State University',
          ranking: '#1 in Russia',
          established: '1755',
          image: 'college-russia-1.jpg'
        },
        {
          name: 'Saint Petersburg State University',
          ranking: '#2 in Russia',
          established: '1724',
          image: 'college-russia-2.jpg'
        }
      ]
    },
    {
      name: 'Armenia',
      code: 'armenia',
      flag: 'https://flagcdn.com/w80/am.png',
      highlights: [
        'English Medium Education',
        'Low Cost of Living',
        'Beautiful Landscapes',
        'Friendly Environment'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$3,500/year' },
        { name: 'BDS', duration: '5 Years', fees: '$3,000/year' }
      ],
      colleges: [
        {
          name: 'Yerevan State Medical University',
          ranking: '#1 in Armenia',
          established: '1920',
          image: 'college-armenia-1.jpg'
        }
      ]
    },
    {
      name: 'Uzbekistan',
      code: 'uzbekistan',
      flag: 'https://flagcdn.com/w80/uz.png',
      highlights: [
        'Modern Infrastructure',
        'Quality Medical Education',
        'Cultural Diversity',
        'Strategic Location'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$3,000/year' },
        { name: 'BDS', duration: '5 Years', fees: '$2,500/year' }
      ],
      colleges: [
        {
          name: 'Tashkent Medical Academy',
          ranking: '#1 in Uzbekistan',
          established: '1919',
          image: 'college-uzbekistan-1.jpg'
        }
      ]
    },
    {
      name: 'Kazakhstan',
      code: 'kazakhstan',
      flag: 'https://flagcdn.com/w80/kz.png',
      highlights: [
        'Rapidly Growing Economy',
        'Modern Educational System',
        'Multicultural Society',
        'Natural Beauty'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$4,500/year' },
        { name: 'Engineering', duration: '4 Years', fees: '$3,500/year' }
      ],
      colleges: [
        {
          name: 'Kazakh National Medical University',
          ranking: '#1 in Kazakhstan',
          established: '1931',
          image: 'college-kazakhstan-1.jpg'
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCountry = params['country'] || null;
    });
  }

  selectCountry(countryCode: string): void {
    this.router.navigate(['/abroad', countryCode]);
  }

  getSelectedCountryData() {
    return this.countries.find(c => c.code === this.selectedCountry);
  }

  goBackToCountries(): void {
    this.router.navigate(['/abroad']);
  }
}
