const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const images = [
  // Logo
  {
    name: 'logo.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGkXqF25_oaRZgM5Ln3ThRd3DNCm1osJ4jOuWGOM2swbqFZDzAxRuIhLH8oKKzJdryUGwQI2R9-IOyq1iS8eaDcJiallkRc8LxhcFr4ULkLV1vrY_UKJPkCAAhd7f5DGOi9PVPwi00RvVKq1bauzxzkdjM9wFrK568UBryLeoDzh07AIkmXTd3tMd6da1JtfNMQHNYl-9I_BQU1X1v_PkITqdG4uLw9V3tp9D2dbAmxNdAbRLT6NUf4ajOrezWXLb2Hw'
  },
  // Signup Logo
  {
    name: 'logo-green.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMx6S0bvUfa0_SqXh14R2Rfk9gvUDhN9JTK_Bo8yfbRXzif_CMvOjbOs7BsQbjQonFDSFljr-AJGTrMQGDPv2WT-gu3X4W2lKHwM7C83kwstJM2Y1byvjpsq2ELlUBBlNuC9rFeqeBJXVjcMTeqwCbEHkNohQN5xEr1ew-PvPdXvPreVu8DWkBMLAkMRVtW2HX28FvQZceVaGQF1DqRdKCxECdgT2AzW3OYzaQ7d5LR36hEVF6lWv9JtzSCe4m6LK-mQ'
  },
  // Homepage Products
  {
    name: 'product-nexus-dashboard.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZkCVxoxLdt98Ch0a3N17RltfC7mybK7FqFr-3IM9Eng4Nev1i6iJnF38uzBO8TJJEImxoKmmI9jqG4XQOb4dLnBHM29N1Aru5PXOS0Dq1d24ZrDMQIq-nbQsBKUNrDAI5NNR8u14RUWBoau7bNSh17zYfxpIdBqhFu-WJFSRcAslGqTLjfWfGQoCZYOAMZJ9twv-ZUbwfs6P-GEIFQ_AHRnKB9R6UmA801GuQYvnesEQJHSk7bXDf'
  },
  {
    name: 'product-aurora-font.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXtEaftXu9R91n0JvyQkjfuqt-UhTTBPm3F4_4Vm01rdbAd87_014Z3FsIj6_bTkjq6kGgSX9GoAz8fNcQanfXKqy6UQZQ3Ao-CRM7EwWyCUO2i5y8z_lym7nvpUjKdguvqmxti7iomu89-OQ-YeQrsOGF0etwMbAQ8zq5zQBVnrDNIXXvpjaojxocKK1dxb-_YcCg7xuCs7OzheaCWpDe8MQvGdHNdTv4mRCimnBaZrZ59xjpcj84'
  },
  {
    name: 'product-neo-geometric.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2A0q8EJgn2uG_OFcVyrGExhhHpptUFIXMB27q7pSVe5wWXnP86fwBqqQVZoyhkTRQIv3YmokvYsKo3lUGZmwkeLgOGs1xd7JugjUWiaFWWoyokvByF0C-UIzS37jJOxcSbAeCU_7e5vNFXG1HgDEbfBnLpBl3pwg-IHwXoc4snaYK5aZ9GpiD_yW8eS21vtFit7tjn65mgEx63zvaz86W5dTmyT2CrTZdrdfgMrLmowRpVW68B0w2'
  },
  {
    name: 'product-3d-icons.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe4Q9tsHdejDCR9Mj7LeP80X8TcNuAZlsng_D51F4oJF2MD6MHXLU1yucbL5fQRWZ5iGBdsh1gHtoWY4s6ncDYlMnynMAihh221Y-Tssjb1Ayzoa74dblbu7PFXS399VQLeq9omnR7azFHSbagW0tuv0kt0tBlYOw319HP3idJ1MP0_InKGIvHk1L2wxnnleTn0H5ANKcXNhVqjUMg0nfUEvEhqAPgamqbt8ln_LO5ydgdyd2Qz46q'
  },
  {
    name: 'product-whisper-script.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVtKWx4s4zdRd-5fVNGn7P7V3I1eydRBqtyON9S7u0w1N9h0QkIS1X_fKPjJMUfFUrvIGhA-gHbRk0FNEUS3cG6kJnFckIKjC4q2miSwgKiubCaO0jue349dvLBAYPocK16Tl5StFxPMi1uQNjQCOnKupoOiw_LBU0q61t68CRa8iYrEPd4zhDoMTzpQDsUZ6bvFgWTYDHCSDDb9B-PzwWLVp-sO29FWHS0q35w4LeyxxWpilIK9Ee'
  },
  {
    name: 'product-retro-grade.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-tFnS77jcL-a3SSqBt51MbwHHOqEPua9jubL-ecjsASj2TDeolrOyir9UKuLqcXWARvQ2rPEDzlJWuOX56ywjLNphZk59fmXjLYb6Gf1tEDCRPHS8dsGu-yXs3JVlaiSJw5ZclnFqafxtcosX5z3uVEDGI9IY3yzcrOBB7Lzz0XhRe_oVJmG2GbLeYWRYDNKBAZ5Vh8JOIu6bOU-oXvZLtCm2ur2CO9Uc9sF1zEItMWdnpZC-PH9G'
  },
  {
    name: 'product-saas-pro.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1SZnO657rCjEKgvszSTvPQpUPK_-3A9OsKxDwGvdcFNk7J0gtWXZOA1mmZGiAPdzQKfGMHpmIzw9s9HM3Hnime4JzDuYcu7IfTQ-RXPnj9gjAgKFmflSOybnwNUjE4rG2E8tyCwZBAVs3Am68wSImPuBN3wMeFBvfSfRLjAScEISr2xmMuUc5fdhttWcdlWqSwQJuZGJ4lfdph_abX3hjDWYk251CDArkkzWIO2D-1ZguOhHHls6V'
  },
  {
    name: 'product-aurora-cart.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKCHhKVPkpvHl6H3xKmG8lS4fDkuKhmk7OGNpEh-FwI39oogXYldWYnWEW8fPQuOtaYVXh8AGzGYJfbw7LnMXNM-kx57gwZh7vUEwQsSD1VMIdi45_Z8fZdoC7UMSzCP_K4c1tdz7tsyRbCanBXJRaSDDuDfOtvaF7KNsFEVMMwpmxOIvhwHusQR2UypPNvaYemXvUjbn9eVvrzbltbHKpPFk918fAHTlTZgLUDyYlzehYrM2MqBnO'
  },
  {
    name: 'product-saas-checkout.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBskV1KMB9pZWzIikwvemJOQ-ag6VRAYLNpQ8nP08FgSpLqTK4GFsM09AbXZpEYWuq4jEPtvThPCULo-aXrBocTJC4A1tYcopj9YE1Qqh9HJZrD6ehHxj3BkqUoW3ewPnZi2DFyp40IpdCbKefMCgXAe1gPJ3lctac_MlSrDf1YC4DZmUHky3cDOwNttihlyCIpwlZyWY8M4tG8iHikNO_ZtqAj_-hVwmZVo4MSOloo2M2pJIVeeO-Z'
  },
  {
    name: 'product-3d-icons-checkout.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe4Q9tsHdejDCR9Mj7LeP80X8TcNuAZlsng_D51F4oJF2MD6MHXLU1yucbL5fQRWZ5iGBdsh1gHtoWY4s6ncDYlMnynMAihh221Y-Tssjb1Ayzoa74dblbu7PFXS399VQLeq9omnR7azFHSbagW0tuv0kt0tBlYOw319HP3idJ1MP0_InKGIvHk1L2wxnnleTn0H5ANKcXNhVqjUMg0nfUEvEhqAPgamqbt8ln_LO5ydgdyd2Qz46q'
  },
  {
    name: 'author-typecraft.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ93HFBF5oIHfqyEMS4uIPupMsH0dYif9CjaJcTfI-JTroRL2OPFY8irspCY5KeJiTtRivNvMYkMu_YRNLs0FYQp__x9PcsPYmAtZiUOFE1abkOTFghFUn1FsFj9EQhuQttFNefa9bF1J2CCBEQwlZo4eEcaKgJIE_0d406Xn7sLUlSdygFqbv8VE0ePYtpgZj3r4G71z6pt3mS3nI4qVW6Y6M1r-HEgafxh1kG47neBX2RAmUdf3e'
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(dest); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(dest); });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log(`📁 Saving to: ${publicDir}\n`);
  let success = 0, failed = 0;
  for (const img of images) {
    const dest = path.join(publicDir, img.name);
    try {
      await download(img.url, dest);
      const size = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(`✅ ${img.name} (${size} KB)`);
      success++;
    } catch (err) {
      console.log(`❌ ${img.name}: ${err.message}`);
      failed++;
    }
  }
  console.log(`\nDone: ${success} downloaded, ${failed} failed.`);
}

main();
