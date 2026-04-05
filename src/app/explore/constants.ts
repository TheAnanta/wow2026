export interface FilterOption {
  id: string;
  label: string;
  classification: string;
  analyticsFilter: string;
}

export interface FilterCategory {
  id: string;
  title: string;
  classification: string;
  items: FilterOption[];
}

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'focus-category',
    title: 'Focus',
    classification: 'stack',
    items: [
      { id: '14574666-1892-4a0e-b305-44d6e3f66c56', label: 'AI', classification: 'stack', analyticsFilter: 'AI' },
      { id: '622b18d9-a6c2-4d31-b506-a2d58e034186', label: 'Cloud', classification: 'stack', analyticsFilter: 'Cloud' },
      { id: 'b31f8e49-c3ba-438e-a7e1-589b4da62640', label: 'Mobile', classification: 'stack', analyticsFilter: 'Mobile' },
      { id: '13eba1ea-1c78-47b8-86ef-c7808d2507db', label: 'Web', classification: 'stack', analyticsFilter: 'Web' }
    ]
  },
  {
    id: 'topics-category',
    title: 'Topics',
    classification: 'topic',
    items: [
      { id: '8f5b3990-4b88-45c9-943c-e05531de0f73', label: 'Accessibility', classification: 'topic', analyticsFilter: 'Accessibility' },
      { id: '88574f1d-9051-4f14-9c60-f83160bcd560', label: 'AI / Machine Learning', classification: 'topic', analyticsFilter: 'AI / Machine Learning' },
      { id: '088d506d-5c55-4b15-9b95-0be49b939c2a', label: 'Android', classification: 'topic', analyticsFilter: 'Android' },
      { id: 'a349f842-4793-437a-952f-645f2e601c5f', label: 'Angular', classification: 'topic', analyticsFilter: 'Angular' },
      { id: '2610ec1e-3784-48bf-9b7f-a9665f8c5cb6', label: 'AR/VR', classification: 'topic', analyticsFilter: 'AR/VR' },
      { id: '404f9e90-5aa9-41a2-9751-372aa824b8fd', label: 'Chrome OS', classification: 'topic', analyticsFilter: 'ChromeOS' },
      { id: 'ad532883-dda3-4066-aa6f-1f858968915d', label: 'Cloud', classification: 'topic', analyticsFilter: 'Cloud' },
      { id: '1177d688-c358-4598-a88e-86fe69f2cfb7', label: 'Design', classification: 'topic', analyticsFilter: 'Design' },
      { id: 'd73701c9-6652-4f18-a628-5237920e7415', label: 'Firebase', classification: 'topic', analyticsFilter: 'Firebase' },
      { id: '5fb7f0e0-a6d3-44e5-8e21-d703ef0333a3', label: 'Flutter', classification: 'topic', analyticsFilter: 'Flutter' },
      { id: 'a4e28745-3a67-4bbd-820d-36886497c07c', label: 'Go', classification: 'topic', analyticsFilter: 'Go' },
      { id: '503cdf28-8e62-4751-b10e-d9fe5499e10a', label: 'Google Play', classification: 'topic', analyticsFilter: 'Google Play' },
      { id: '700fed55-dc35-40c0-976b-788a66f332ed', label: 'Location/Maps', classification: 'topic', analyticsFilter: 'Location/Maps' },
      { id: '1232df61-7b3a-4efa-89be-b26714c3d6e4', label: 'Smart Home', classification: 'topic', analyticsFilter: 'Smart Home' },
      { id: 'd52ff67c-f7fe-463d-a978-3fcaf989fb21', label: 'Wear OS', classification: 'topic', analyticsFilter: 'Wear OS' },
      { id: 'f753bf55-c398-4f4a-941b-329b296bd287', label: 'Web', classification: 'topic', analyticsFilter: 'Web' }
    ]
  },
  {
    id: 'type-category',
    title: 'Content type',
    classification: 'type',
    items: [
      { id: 'keynote-filter', label: 'Keynote', classification: 'type', analyticsFilter: 'Keynote' },
      { id: '71b9babb-77d8-4a81-b8b3-8d9d7d71081e', label: 'Technical session', classification: 'type', analyticsFilter: 'Technical session' },
      { id: '98b75245-0ae8-4524-9272-760afbbd1458', label: 'Workshop', classification: 'type', analyticsFilter: 'Workshop' }
    ]
  },
  {
    id: 'level-category',
    title: 'Level',
    classification: 'level',
    items: [
      { id: 'e351b55e-b8ab-4b3c-aff9-cee0d294ea29', label: 'Beginner', classification: 'level', analyticsFilter: 'Beginner' },
      { id: 'a0d5636a-51e6-4cd8-a809-85aa7a67d8d3', label: 'Intermediate', classification: 'level', analyticsFilter: 'Intermediate' },
      { id: '46f60ade-f383-4563-9396-b2855a2f0c68', label: 'Advanced', classification: 'level', analyticsFilter: 'Advanced' }
    ]
  }
];
