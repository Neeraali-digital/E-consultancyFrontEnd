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
  selectedCountryData: any = null;

  countries = [
    {
      name: 'India',
      code: 'india',
      flag: 'https://flagcdn.com/w80/in.png',
      highlights: [
        'Top-rated Medical Universities',
        'Recognized by NMC & WHO',
        'Diverse Clinical Exposure',
        'Competitive Learning Environment'
      ],
      courses: [
        { name: 'MBBS', duration: '5.5 Years', fees: 'Varies by college' },
        { name: 'BDS', duration: '5 Years', fees: 'Competitive' }
      ],
      colleges: [
        { name: 'AIIMS Delhi', ranking: '#1 in India', established: '1956', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800' },
        { name: 'CMC Vellore', ranking: '#2 in India', established: '1900', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' }
      ]
    },
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
        { name: 'MBBS/MD', duration: '6 Years', fees: '$4,500/year' },
        { name: 'BDS', duration: '5 Years', fees: '$3,500/year' }
      ],
      colleges: [
        { name: 'Tbilisi State Medical University', ranking: '#1 in Georgia', established: '1918', image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?w=800' },
        { name: 'Caucasus International University', ranking: '#2 in Georgia', established: '1995', image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800' }
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
        { name: 'MBBS', duration: '6 Years', fees: '$4,000/year' },
        { name: 'BDS', duration: '5 Years', fees: '$3,500/year' }
      ],
      colleges: [
        { name: 'Kazan Federal University', ranking: '#1 in Medicine', established: '1804', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800' },
        { name: 'I.M. Sechenov First Moscow State', ranking: '#2 in Medicine', established: '1758', image: 'https://images.unsplash.com/photo-152305085306e-8c3339bf0802?w=800' }
      ]
    },
    {
      name: 'Armenia',
      code: 'armenia',
      flag: 'https://flagcdn.com/w80/am.png',
      highlights: [
        'English Medium Education',
        'Low Cost of Living',
        'NMC/WHO Approved',
        'Indian Food Availability'
      ],
      courses: [
        { name: 'MBBS/MD', duration: '6 Years', fees: '$3,500/year' },
        { name: 'BDS', duration: '5 Years', fees: '$3,000/year' }
      ],
      colleges: [
        { name: 'Yerevan State Medical University', ranking: '#1 in Armenia', established: '1920', image: 'https://images.unsplash.com/photo-1574041180415-0d0484081690?w=800' },
        { name: 'St. Theresa Medical University', ranking: 'Top Rated', established: '1992', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' }
      ]
    },
    {
      name: 'Uzbekistan',
      code: 'uzbekistan',
      flag: 'https://flagcdn.com/w80/uz.png',
      highlights: [
        'Modern Infrastructure',
        'High FMGE Pass Rate',
        'Similar Climate to India',
        'Affordable Fees'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$3,200/year' },
        { name: 'Dentistry', duration: '5 Years', fees: '$2,800/year' }
      ],
      colleges: [
        { name: 'Fergana State Medical University', ranking: 'Top Rated', established: '1930', image: 'https://images.unsplash.com/photo-1498243639391-f33de71a7c8a?w=800' },
        { name: 'Tashkent Medical Academy', ranking: '#1 in Uzbekistan', established: '1919', image: 'https://images.unsplash.com/photo-1541829011353-8314e91326c1?w=800' }
      ]
    },
    {
      name: 'Kazakhstan',
      code: 'kazakhstan',
      flag: 'https://flagcdn.com/w80/kz.png',
      highlights: [
        'Direct Admission',
        'English Medium Curriculum',
        'Top Quality Clinical Lab',
        'Indian Community'
      ],
      courses: [
        { name: 'MBBS', duration: '5 Years', fees: '$4,000/year' },
        { name: 'Pharmacy', duration: '4 Years', fees: '$3,000/year' }
      ],
      colleges: [
        { name: 'Asfendiyarov Kazakh National', ranking: '#1 in Kazakhstan', established: '1930', image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=800' },
        { name: 'Semey State Medical University', ranking: '#2 in Kazakhstan', established: '1952', image: 'https://images.unsplash.com/photo-1576089238210-0bc24e27c030?w=800' }
      ]
    },
    {
      name: 'Moldova',
      code: 'moldova',
      flag: 'https://flagcdn.com/w80/md.png',
      highlights: [
        'European Degree Recognition',
        'State-of-the-Art Labs',
        'Low Tuition Fees',
        'Member of EU Process'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$4,000/year' },
        { name: 'Medicine', duration: '6 Years', fees: '$4,200/year' }
      ],
      colleges: [
        { name: 'Nicolae Testemitanu University', ranking: '#1 in Moldova', established: '1945', image: 'https://images.unsplash.com/photo-1503676260728-1c00da07bb2e?w=800' }
      ]
    },
    {
      name: 'Malaysia',
      code: 'malaysia',
      flag: 'https://flagcdn.com/w80/my.png',
      highlights: [
        'Global Education Hub',
        'Modern Medical Equipment',
        'International Exposure',
        'Tropical Paradise'
      ],
      courses: [
        { name: 'MBBS', duration: '5 Years', fees: '$8,000/year' },
        { name: 'Pharmacy', duration: '4 Years', fees: '$6,000/year' }
      ],
      colleges: [
        { name: 'Monash University Malaysia', ranking: 'Global Top 100', established: '1998', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800' },
        { name: 'Cyberjaya University', ranking: 'Top Tier Medicine', established: '2005', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' }
      ]
    },
    {
      name: 'Kyrgyzstan',
      code: 'kyrgyzstan',
      flag: 'https://flagcdn.com/w80/kg.png',
      highlights: [
        'Lowest Fees in Abroad',
        'No Entrance Exams',
        'Budget-Friendly Living',
        'Direct Flight Access'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$3,000/year' },
        { name: 'Pharmacy', duration: '4 Years', fees: '$2,500/year' }
      ],
      colleges: [
        { name: 'Osh State University', ranking: '#1 in Kyrgyzstan', established: '1939', image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800' },
        { name: 'International School of Medicine', ranking: 'Most Popular', established: '2003', image: 'https://images.unsplash.com/photo-1576089238240-620215712e02?w=800' }
      ]
    },
    {
      name: 'Tajikistan',
      code: 'tajikistan',
      flag: 'https://flagcdn.com/w80/tj.png',
      highlights: [
        'Recognized Worldwide',
        'Hands-on Practical Training',
        'Peaceful Environment',
        'Close Cultural Ties with India'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '$3,000/year' }
      ],
      colleges: [
        { name: 'Avicenna Tajik State Medical', ranking: '#1 in Tajikistan', established: '1939', image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800' }
      ]
    },
    {
      name: 'Romania',
      code: 'romania',
      flag: 'https://flagcdn.com/w80/ro.png',
      highlights: [
        'EU Medical Degree',
        'Top Quality Education',
        'Post-Graduation Options in EU',
        'Multicultural Experience'
      ],
      courses: [
        { name: 'MBBS', duration: '6 Years', fees: '€5,000/year' },
        { name: 'Dental Medicine', duration: '6 Years', fees: '€4,500/year' }
      ],
      colleges: [
        { name: 'Univ of Med & Pharmacy Carol Davila', ranking: '#1 in Romania', established: '1857', image: 'https://images.unsplash.com/photo-1498243639391-f33de71a7c8a?w=800' }
      ]
    },
    {
      name: 'Mauritius',
      code: 'mauritius',
      flag: 'https://flagcdn.com/w80/mu.png',
      highlights: [
        'US Based Curriculum',
        'WHO & ECFMG Recognized',
        'Clinical Rotation in US/India',
        'High Quality of Life'
      ],
      courses: [
        { name: 'MBBS', duration: '5 Years', fees: '$9,000/year' }
      ],
      colleges: [
        { name: 'Anna Medical College', ranking: 'Excellent Infrastructure', established: '2012', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800' },
        { name: 'SSR Medical College', ranking: '#1 in Mauritius', established: '1996', image: 'https://images.unsplash.com/photo-1568992687345-269482d93e74?w=800' }
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
      this.selectedCountryData = this.countries.find(c => c.code === this.selectedCountry);
    });
  }

  selectCountry(countryCode: string): void {
    this.router.navigate(['/abroad', countryCode]);
  }



  goBackToCountries(): void {
    this.router.navigate(['/abroad']);
  }
}
