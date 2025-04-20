import React, { useState } from 'react';
import './CaringForPets.css';

const CaringForPets = () => {
  const [expandedArticle, setExpandedArticle] = useState(null);

  // Image URLs (can be local paths or external URLs)
  const images = {
    seniorDog: "https://ucarecdn.com/4a832646-cb6b-4274-a376-17f5a7f0c0f7/-/format/auto/-/preview/750x750/-/quality/lighter/Shutterstock_1785117980.jpg",
    grooming: "https://www.petstyle.in/img/dog-about.png",
    activeDog: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZgXO-d67b4MjrhGzlpZv351M3ZuysCzEftg&s",
    nutrition: "https://creature-companions.in/wp-content/uploads/2020/03/08_CAN-A-FRESH-FOOD-DIET.jpg",
    vetVisit: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WEiVnMgvr4BHSE-V1bnkWckyKeaJBCrmkw&s",
    dentalCare: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vJi_6gHXEUgO61KMWQv1HZa6gdkjv0FFWg&s",
    petAnxiety: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStlHMcjVU8h59SeD11rjeXVSabH2Lrdl5LjA&s",
    summerCare: "https://kuddle.pet/images/social/blog/summer-care-tips-for-dogs/summer_care_tips_for_dogs.webp",
    winterCare: "https://www.aplusapets.com/cdn/shop/articles/IMG_6788.jpg?v=1706774636",
    petFirstAid: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RxxV-pZ_n1DSqtCTD70atj_BALIarrnvxA&s"
  };

  const articles = [
    {
      id: 1,
      title: "6 Essential Tips On Caring For Your Senior Dog",
      image: images.seniorDog,
      summary: "Age catches up to our geriatric canine companions as it does to everyone. It's the circle of...",
      content: `Age catches up to our geriatric canine companions as it does to everyone. It's the circle of life that repeats itself in every living being and it's our duty to make this transition as smooth as possible for our furry friends. Canine care in these sunset years is crucial; we need to care for our older companions as we take care of ageing family members- all it takes is love and sensitivity.

Here are six essential tips:

1. **Keep them active** with gentle exercises like short walks
2. **Adjust their diet** to meet changing nutritional needs
3. **Regular vet checkups** (at least twice a year)
4. **Comfortable bedding** to support aging joints
5. **Mental stimulation** with puzzle toys
6. **Proper grooming** as their coat changes with age`
    },
    {
      id: 2,
      title: "10 At-Home Grooming Tips For Senior Dogs",
      image: images.grooming,
      summary: "No matter how adept you are at being a pet parent, pet grooming is and always will remain a...",
      content: `No matter how adept you are at being a pet parent, pet grooming is and always will remain a challenging task, especially for senior dogs. As dogs age, their grooming needs change and they often require more gentle care.
      
Essential grooming tips:

1. Use soft-bristle brushes
2. Bathe less frequently (every 6-8 weeks)
3. Check and clean ears weekly
4. Trim nails carefully
5. Brush teeth regularly
6. Be gentle with matted fur
7. Use pet-safe wipes between baths
8. Check for skin issues
9. Keep paw pads moisturized
10. Make it a positive experience with treats`
    },
    {
      id: 3,
      title: "5 Ways To Keep Your Senior Dog Active",
      image: images.activeDog,
      summary: "Watching a young energetic pet approach their senior years is not an easy sight for the eyes...",
      content: `Watching a young energetic pet approach their senior years is not an easy sight for the eyes, but with proper care, you can maintain their quality of life.
      
Activity ideas for senior dogs:

1. Short, frequent walks (10-15 minutes)
2. Swimming (great for joints)
3. Gentle fetch with soft toys
4. Food puzzle games
5. New scent exploration in the yard

Always monitor for signs of fatigue and consult your vet about appropriate activity levels.`
    },
    {
      id: 4,
      title: "Senior Dog Nutrition Guide",
      image: images.nutrition,
      summary: "As dogs age, their dietary needs change significantly. Here's what you need to know about...",
      content: `As dogs age, their dietary needs change significantly. Senior dogs typically need:

- Fewer calories (but more protein)
- Increased fiber for digestion
- Joint-supporting supplements
- Smaller, more frequent meals
- Plenty of fresh water

Always consult your vet before changing your dog's diet and look for AAFCO-approved senior formulas.`
    },
    {
      id: 5,
      title: "Vet Visits for Senior Pets",
      image: images.vetVisit,
      summary: "How often should your senior pet see the vet? The answer might surprise you...",
      content: `Senior pets should visit the vet at least twice yearly for:

• Comprehensive physical exams
• Blood work and urinalysis
• Dental evaluation
• Weight and nutrition counseling
• Pain management assessment

Watch for these warning signs between visits:
- Changes in appetite or thirst
- Lumps or bumps
- Difficulty moving
- Behavioral changes
- Accidents in the house`
    },
    {
      id: 6,
      title: "Dental Care for Aging Pets",
      image: images.dentalCare,
      summary: "Dental health becomes increasingly important as pets age. Learn how to maintain...",
      content: `Dental disease affects over 80% of pets by age 3. For senior pets:

Daily Care:
- Brush teeth with pet toothpaste
- Use dental chews
- Add water additives

Professional Care:
- Annual dental cleanings
- Tooth extractions when needed
- Oral pain management

Warning signs:
• Bad breath
• Dropping food
• Pawing at mouth
• Red or bleeding gums`
    },
    {
      id: 7,
      title: "Managing Anxiety in Older Pets",
      image: images.petAnxiety,
      summary: "Senior pets often develop new anxieties. Here's how to help them feel secure...",
      content: `Common causes of senior pet anxiety:

- Cognitive decline
- Hearing/vision loss
- Pain from arthritis
- Routine changes

Solutions:
1. Maintain consistent routines
2. Provide safe spaces
3. Use pheromone diffusers
4. Try anxiety wraps
5. Consider vet-prescribed medications
6. Increase gentle interaction

Never punish anxious behaviors - they need patience and understanding.`
    },
    {
      id: 8,
      title: "Summer Care for Senior Pets",
      image: images.summerCare,
      summary: "Hot weather poses special risks for older animals. Keep your pet safe with these tips...",
      content: `Summer dangers for senior pets:

☀️ Heat stroke (more vulnerable due to slower metabolism)
🐾 Burned paw pads on hot surfaces
🦟 Increased parasite risks
💧 Dehydration from reduced kidney function

Protection strategies:
- Walk early morning/late evening
- Provide cooling mats
- Always have fresh water
- Use pet-safe sunscreen
- Never leave in parked cars
- Watch for overheating signs`
    },
    {
      id: 9,
      title: "Winter Care for Elderly Pets",
      image: images.winterCare,
      summary: "Cold weather can be tough on aging joints. Here's how to keep your senior pet comfortable...",
      content: `Winter challenges for senior pets:

❄️ Arthritis pain worsens in cold
🧊 Slips on icy surfaces
🌨️ Hypothermia risk increases
🏠 Dry skin from indoor heating

Winter care tips:
1. Provide orthopedic heated beds
2. Use pet-safe ice melt
3. Try sweater or coat for short-haired breeds
4. Wipe paws after walks
5. Humidify dry indoor air
6. Shorter but more frequent walks
7. Increase joint supplements in winter`
    },
    {
      id: 10,
      title: "First Aid for Senior Pets",
      image: images.petFirstAid,
      summary: "Be prepared for emergencies with this senior-specific first aid guide...",
      content: `Senior Pet First Aid Essentials:

🚑 Emergency Kit:
- Vet contact info
- Medical records
- Medications list
- Digital thermometer
- Gauze and bandages
- Hydrogen peroxide (vet-approved use only)

Common Senior Emergencies:
• Difficulty breathing
• Sudden collapse
• Seizures
• Bleeding that won't stop
• Inability to stand

Always call your vet immediately for senior pet emergencies - they deteriorate faster than younger pets.`
    }
  ];

  const handleReadMore = (articleId) => {
    setExpandedArticle(articleId === expandedArticle ? null : articleId);
  };

  const handleCloseModal = () => {
    setExpandedArticle(null);
  };

  

  return (
    <div className="caring-container">
        <div className="title-container">
        <img 
          src="https://res.cloudinary.com/da1dzhidd/image/upload/v1745149784/Jheel/Add_a_little_bit_of_body_text-3_gfnyeg.png" 
          alt="Pet care icon" 
          className="title-icon" 
        />
      
      </div>
      <h1>Caring For Pets</h1>
      
      <div className="articles-grid">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <div className="article-image-container">
              <img 
                src={article.image} 
                alt={article.title}
                className="article-image"
              />
            </div>
            <div className="article-content-wrapper">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
            <button 
              className="read-more-btn"
              onClick={() => handleReadMore(article.id)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {expandedArticle && (
        <div className="article-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>×</button>
            <div className="modal-image-container">
              <img 
                src={articles.find(a => a.id === expandedArticle).image}
                alt={articles.find(a => a.id === expandedArticle).title}
                className="modal-image"
              />
            </div>
            <h2>{articles.find(a => a.id === expandedArticle).title}</h2>
            <div className="article-full-content">
              {articles.find(a => a.id === expandedArticle).content
                .split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaringForPets;