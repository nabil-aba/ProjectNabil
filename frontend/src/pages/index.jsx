import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Button,
  Link,
  Tag,
  TagLabel,
  Container,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import {
  DownloadIcon,
  SearchIcon,
  HamburgerIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { FaGithub, FaGlobe, FaGamepad, FaWrench, FaUser } from "react-icons/fa";
import Masonry from "react-masonry-css";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";

const MASONRY_BREAKPOINTS = { default: 4, 1280: 4, 1024: 3, 640: 2, 480: 2 };

const MASONRY_STYLES = `
  .my-masonry-grid { display: flex; margin-left: -5px; width: auto; }
  .my-masonry-grid_column { padding-left: 5px; background-clip: padding-box; }
  .my-masonry-grid_column > div { margin-bottom: 5px; }
`;

const DUMMY_TOKEN = "nabil123";

const SECTIONS = [
  {
    id: "wallpaper",
    label: "🖼️ Wallpaper",
    description: "Koleksi wallpaper custom resolusi tinggi.",
    type: "wallpaper",
    items: [
      {
        title: "Naruto Balapan",
        image: "/wp/1.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/8.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/9.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/2.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/3.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/4.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/5.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/6.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/10.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/11.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/12.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/13.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/14.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/15.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/16.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/17.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/18.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/19.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/20.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/7.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/21.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/22.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/23.jpeg",
        downloadUrl: "#",
      },

      {
        title: "Ocean Sunset",
        image: "/wp/24.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/25.jpeg",
        downloadUrl: "#",
      },
      {
        title: "Ocean Sunset",
        image: "/wp/26.jpeg",
        downloadUrl: "#",
      },
    ],
  },
  {
    id: "iconpack",
    label: "🎨 Icon Pack",
    description: "Ikon custom bergaya flat, glassmorphism, dan skeuomorphic.",
    type: "iconpack",
    items: [
      {
        title: "Flat UI Icons v1",
        image: "https://placehold.co/300x300/7209b7/ffffff?text=Icon+Pack+1",
        downloadUrl: "#",
        badge: "Free",
      },
      {
        title: "Glass Icons Pack",
        image: "https://placehold.co/300x300/3a0ca3/ffffff?text=Icon+Pack+2",
        downloadUrl: "#",
        badge: "Paid",
      },
      {
        title: "MIUI Custom Icons",
        image: "https://placehold.co/300x300/f72585/ffffff?text=MIUI+Icons",
        downloadUrl: "#",
        badge: "Paid",
      },
    ],
  },
  {
    id: "web",
    label: "🌐 Web Project",
    description: "Project web mulai dari undangan digital hingga dashboard.",
    type: "web",
    items: [
      {
        title: "Web Undangan Pernikahan",
        description:
          "Template undangan digital animasi smooth, mudah dikustom nama & tanggal.",
        image: "https://placehold.co/400x220/457b9d/ffffff?text=Undangan",
        demoUrl: "#",
        githubUrl: "#",
        tags: ["React", "Vite", "Chakra UI"],
        badge: "Jasa",
      },
      {
        title: "Portfolio Template",
        description: "Template portfolio minimalis untuk developer & designer.",
        image: "https://placehold.co/400x220/1d3557/ffffff?text=Portfolio",
        demoUrl: "#",
        githubUrl: "#",
        tags: ["React", "Tailwind"],
        badge: "Free",
      },
      {
        title: "Landing Page UMKM",
        description: "Landing page produk UMKM dengan CTA, galeri, dan kontak.",
        image: "https://placehold.co/400x220/e63946/ffffff?text=UMKM",
        demoUrl: "#",
        githubUrl: "#",
        tags: ["HTML", "CSS", "JS"],
        badge: "Jasa",
      },
    ],
  },
  {
    id: "modding",
    label: "🔧 Game Modding",
    description: "Mod visual & gameplay untuk berbagai game.",
    type: "modding",
    items: [
      {
        title: "GTA SA HD Texture Mod",
        description:
          "Retexture seluruh environment GTA San Andreas ke resolusi 4K.",
        image: "https://placehold.co/400x220/2d6a4f/ffffff?text=GTA+Mod",
        downloadUrl: "#",
        tags: ["GTA SA", "Textures", "CLEO"],
        badge: "Free",
      },
      {
        title: "Minecraft Shader Pack",
        description:
          "Custom shader untuk Minecraft MCPE dengan efek dynamic lighting.",
        image: "https://placehold.co/400x220/40916c/ffffff?text=MC+Shader",
        downloadUrl: "#",
        tags: ["Minecraft", "GLSL", "MCPE"],
        badge: "Free",
      },
    ],
  },
  {
    id: "game",
    label: "🎮 Game",
    description: "Project game original karya sendiri.",
    type: "game",
    items: [
      {
        title: "Mini Puzzle Web Game",
        description:
          "Puzzle berbasis web, playable langsung di browser tanpa install.",
        image: "https://placehold.co/400x220/e94560/ffffff?text=Puzzle+Game",
        demoUrl: "#",
        githubUrl: "#",
        tags: ["JavaScript", "Canvas", "HTML5"],
        badge: "Free",
      },
      {
        title: "Endless Runner Mobile",
        description:
          "Game endless runner untuk Android dengan sistem high score.",
        image: "https://placehold.co/400x220/9d4edd/ffffff?text=Runner+Game",
        demoUrl: "#",
        githubUrl: "#",
        tags: ["Unity", "C#", "Android"],
        badge: "Free",
      },
    ],
  },
];

const BADGE_COLORS = { Free: "blue", Paid: "green", Jasa: "purple" };

function WallpaperCard({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const verifyToken = () => {
    const currentToken = localStorage.getItem("nabil_token");
    if (currentToken === DUMMY_TOKEN) return true;
    const input = window.prompt(
      "Akses Terkunci. Masukkan token (dummy: nabil123):",
    );
    if (input === DUMMY_TOKEN) {
      localStorage.setItem("nabil_token", input);
      toast({ title: "Akses diberikan", status: "success", duration: 2000 });
      return true;
    }
    if (input !== null) {
      toast({ title: "Token tidak valid", status: "error", duration: 2000 });
    }
    return false;
  };

  const handleDownloadWithWatermark = (e, imageUrl, title) => {
    if (e) e.stopPropagation();
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 1080;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = (MAX_WIDTH / width) * height;
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const fontSize = Math.max(Math.floor(canvas.width / 15), 24);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);

      const text = "PROJECTNABIL";
      const textWidth = ctx.measureText(text).width + 80;
      const textHeight = fontSize + 100;
      const maxDim = Math.max(canvas.width, canvas.height) * 2;

      for (let x = -maxDim; x < maxDim; x += textWidth) {
        for (let y = -maxDim; y < maxDim; y += textHeight) {
          ctx.fillText(text, x, y);
        }
      }

      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      const link = document.createElement("a");
      link.download = `${title}-preview.jpg`;
      link.href = dataUrl;
      link.click();
    };
  };

  const handleOriginalDownload = (e, imageUrl, title, resolution) => {
    if (e) e.stopPropagation();
    if (!verifyToken()) return;

    if (resolution === "original") {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${title}-original.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (resolution === "1080p") {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 1080;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height = (MAX_WIDTH / width) * height;
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        const link = document.createElement("a");
        link.download = `${title}-1080p.jpg`;
        link.href = dataUrl;
        link.click();
      };
    }
  };

  return (
    <>
      <Box
        borderRadius="xl"
        overflow="hidden"
        cursor="pointer"
        position="relative"
        role="group"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
        onClick={onOpen}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image
          src={item.image}
          alt={item.title}
          w="100%"
          display="block"
          transition="transform 0.3s"
          draggable={false}
          pointerEvents="none"
          userSelect="none"
          loading="lazy"
        />
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.600"
          opacity={0}
          transition="opacity 0.25s"
          _groupHover={{ opacity: 1 }}
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          pb={4}
        >
          <HStack spacing={2} onClick={(e) => e.stopPropagation()}>
            <Button
              size="xs"
              bg="white"
              color="gray.900"
              borderRadius="full"
              fontWeight="bold"
              _hover={{ bg: "gray.100" }}
              onClick={(e) =>
                handleDownloadWithWatermark(e, item.image, item.title)
              }
            >
              Preview
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                size="xs"
                colorScheme="blue"
                borderRadius="full"
                rightIcon={<ChevronDownIcon />}
                onClick={(e) => e.stopPropagation()}
              >
                Download
              </MenuButton>
              <MenuList color="gray.800" minW="150px">
                <MenuItem
                  onClick={(e) =>
                    handleOriginalDownload(
                      e,
                      item.image,
                      item.title,
                      "original",
                    )
                  }
                >
                  Original (4K)
                </MenuItem>
                <MenuItem
                  onClick={(e) =>
                    handleOriginalDownload(e, item.image, item.title, "1080p")
                  }
                >
                  HD (1080p)
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          px={3}
          py={2}
          pointerEvents="none"
        >
          <Text color="white" fontWeight="semibold" fontSize="xs" noOfLines={1}>
            {item.title}
          </Text>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.700" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          mx={4}
          my={4}
          maxH="calc(100vh - 32px)"
        >
          <ModalCloseButton
            color="black"
            bg="white"
            zIndex={10}
            m={2}
            borderRadius="full"
            _hover={{ bg: "gray.200" }}
          />
          <ModalBody p={0} display="flex" flexDirection="column">
            <Box
              borderRadius="xl"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              bg="gray.900"
              maxH="full"
              position="relative"
              onContextMenu={(e) => e.preventDefault()}
            >
              <Box position="absolute" inset={0} zIndex={1} />
              <Image
                src={item.image}
                alt={item.title}
                w="100%"
                maxH="calc(100vh - 120px)"
                objectFit="contain"
                draggable={false}
                pointerEvents="none"
                userSelect="none"
                loading="lazy"
              />
              <Flex
                bg="white"
                p={4}
                justify="space-between"
                align="center"
                flexShrink={0}
                zIndex={2}
                wrap="wrap"
                gap={2}
              >
                <Text fontWeight="bold" color="gray.800">
                  {item.title}
                </Text>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    bg="gray.100"
                    color="gray.900"
                    borderRadius="full"
                    _hover={{ bg: "gray.200" }}
                    onClick={(e) =>
                      handleDownloadWithWatermark(e, item.image, item.title)
                    }
                  >
                    Preview
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                      rightIcon={<ChevronDownIcon />}
                    >
                      Download
                    </MenuButton>
                    <MenuList color="gray.800" minW="150px">
                      <MenuItem
                        onClick={(e) =>
                          handleOriginalDownload(
                            e,
                            item.image,
                            item.title,
                            "original",
                          )
                        }
                      >
                        Original (4K)
                      </MenuItem>
                      <MenuItem
                        onClick={(e) =>
                          handleOriginalDownload(
                            e,
                            item.image,
                            item.title,
                            "1080p",
                          )
                        }
                      >
                        HD (1080p)
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function IconPackCard({ item }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      p={4}
      position="relative"
    >
      {item.badge && (
        <Badge
          colorScheme={BADGE_COLORS[item.badge]}
          position="absolute"
          top={3}
          right={3}
          borderRadius="full"
          px={2}
        >
          {item.badge}
        </Badge>
      )}
      <Image
        src={item.image}
        alt={item.title}
        w="100%"
        borderRadius="xl"
        mb={3}
        loading="lazy"
      />
      <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={3}>
        {item.title}
      </Text>
      <Button
        size="sm"
        w="100%"
        bg="gray.900"
        color="white"
        borderRadius="full"
        _hover={{ bg: "gray.700" }}
      >
        Download Pack
      </Button>
    </Box>
  );
}

function WebCard({ item }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      position="relative"
    >
      {item.badge && (
        <Badge
          colorScheme={BADGE_COLORS[item.badge]}
          position="absolute"
          top={3}
          left={3}
          borderRadius="full"
          zIndex={1}
          px={2}
        >
          {item.badge}
        </Badge>
      )}
      <Image src={item.image} alt={item.title} w="100%" loading="lazy" />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md" color="gray.800" mb={1}>
          {item.title}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={3}>
          {item.description}
        </Text>
        <Flex flexWrap="wrap" gap={1} mb={3}>
          {item.tags.map((tag) => (
            <Tag key={tag} size="sm" borderRadius="full" colorScheme="gray">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <HStack>
          <Button
            size="sm"
            leftIcon={<FaGlobe />}
            bg="gray.900"
            color="white"
            borderRadius="full"
            _hover={{ bg: "gray.700" }}
            isDisabled={!item.demoUrl || item.demoUrl === "#"}
          >
            Demo
          </Button>
          <Button
            size="sm"
            leftIcon={<FaGithub />}
            variant="outline"
            borderColor="gray.300"
            color="gray.700"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
            isDisabled={!item.githubUrl || item.githubUrl === "#"}
          >
            GitHub
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

function ModdingCard({ item }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      position="relative"
    >
      {item.badge && (
        <Badge
          colorScheme={BADGE_COLORS[item.badge]}
          position="absolute"
          top={3}
          left={3}
          borderRadius="full"
          zIndex={1}
          px={2}
        >
          {item.badge}
        </Badge>
      )}
      <Image src={item.image} alt={item.title} w="100%" loading="lazy" />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md" color="gray.800" mb={1}>
          {item.title}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={3}>
          {item.description}
        </Text>
        <Flex flexWrap="wrap" gap={1} mb={3}>
          {item.tags.map((tag) => (
            <Tag key={tag} size="sm" borderRadius="full" colorScheme="gray">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <Button
          size="sm"
          leftIcon={<FaWrench />}
          bg="gray.900"
          color="white"
          borderRadius="full"
          _hover={{ bg: "gray.700" }}
          isDisabled={!item.downloadUrl || item.downloadUrl === "#"}
        >
          {item.downloadUrl && item.downloadUrl !== "#"
            ? "Download Mod"
            : "Coming Soon"}
        </Button>
      </Box>
    </Box>
  );
}

function GameCard({ item }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      position="relative"
    >
      {item.badge && (
        <Badge
          colorScheme={BADGE_COLORS[item.badge]}
          position="absolute"
          top={3}
          left={3}
          borderRadius="full"
          zIndex={1}
          px={2}
        >
          {item.badge}
        </Badge>
      )}
      <Image src={item.image} alt={item.title} w="100%" loading="lazy" />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md" color="gray.800" mb={1}>
          {item.title}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={3}>
          {item.description}
        </Text>
        <Flex flexWrap="wrap" gap={1} mb={3}>
          {item.tags.map((tag) => (
            <Tag key={tag} size="sm" borderRadius="full" colorScheme="gray">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <HStack>
          <Button
            size="sm"
            leftIcon={<FaGamepad />}
            bg="gray.900"
            color="white"
            borderRadius="full"
            _hover={{ bg: "gray.700" }}
            isDisabled={!item.demoUrl || item.demoUrl === "#"}
          >
            Play
          </Button>
          <Button
            size="sm"
            leftIcon={<FaGithub />}
            variant="outline"
            borderColor="gray.300"
            color="gray.700"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
            isDisabled={!item.githubUrl || item.githubUrl === "#"}
          >
            GitHub
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

function SectionBlock({ section, query, navHeight }) {
  const filtered = section.items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(query.toLowerCase()) ||
      (item.tags || []).some((t) =>
        t.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  if (filtered.length === 0) return null;

  const cols =
    section.type === "wallpaper"
      ? { base: 2, sm: 3, md: 4, lg: 5 }
      : { base: 1, sm: 2, lg: 3 };

  const renderCard = (item, i) => {
    if (section.type === "wallpaper")
      return <WallpaperCard key={i} item={item} />;
    if (section.type === "iconpack")
      return <IconPackCard key={i} item={item} />;
    if (section.type === "web") return <WebCard key={i} item={item} />;
    if (section.type === "modding") return <ModdingCard key={i} item={item} />;
    if (section.type === "game") return <GameCard key={i} item={item} />;
    return null;
  };

  return (
    <Box
      as="section"
      id={section.id}
      pt={8}
      pb={8}
      style={{ scrollMarginTop: `${navHeight}px` }}
    >
      <Flex align="baseline" gap={3} mb={1}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="extrabold"
          color="gray.900"
        >
          {section.label}
        </Heading>
        <Text fontSize="sm" color="gray.400">
          {filtered.length} item
        </Text>
      </Flex>
      {section.description && (
        <Text fontSize="sm" color="gray.400" mb={5}>
          {section.description}
        </Text>
      )}

      {section.type === "wallpaper" ? (
        <Masonry
          breakpointCols={MASONRY_BREAKPOINTS}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filtered.map((item, i) => renderCard(item, i)).reverse()}
        </Masonry>
      ) : (
        <SimpleGrid columns={cols} spacing={3}>
          {filtered.map((item, i) => renderCard(item, i))}
        </SimpleGrid>
      )}
    </Box>
  );
}

function NavDrawer({ isOpen, onClose, sections }) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="white" maxW="260px">
        <DrawerCloseButton color="black" />
        <DrawerBody pt={12}>
          <Text fontWeight="extrabold" fontSize="lg" color="gray.900" mb={6}>
            ProjectNabil
          </Text>
          <VStack align="stretch" spacing={1}>
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                onClick={onClose}
                display="block"
                px={3}
                py={2}
                borderRadius="lg"
                fontWeight="medium"
                color="gray.700"
                fontSize="sm"
                _hover={{ bg: "gray.100", textDecoration: "none" }}
              >
                {s.label}
              </Link>
            ))}
            <Box pt={4} borderTop="1px solid" borderColor="gray.100" mt={2}>
              <Link
                href="/about"
                onClick={onClose}
                display="flex"
                alignItems="center"
                gap={2}
                px={3}
                py={2}
                borderRadius="lg"
                fontWeight="medium"
                color="gray.700"
                fontSize="sm"
                _hover={{ bg: "gray.100", textDecoration: "none" }}
              >
                <FaUser size={12} />
                About Me
              </Link>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!navRef.current) return;
    setNavHeight(navRef.current.offsetHeight);
    const observer = new ResizeObserver(() => {
      setNavHeight(navRef.current.offsetHeight);
    });
    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  const hasAnyResult = SECTIONS.some((s) =>
    s.items.some(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(query.toLowerCase()) ||
        (item.tags || []).some((t) =>
          t.toLowerCase().includes(query.toLowerCase()),
        ),
    ),
  );

  return (
    <Stack
      spacing="0"
      bg="#f8f9fa"
      minH="100dvh"
      fontFamily="'Inter', sans-serif"
    >
      <Seo title="ProjectNabil - Portfolio of Wallpapers, Icon Packs, Web Projects, Game Modding, and Original Games" />
      <style>{MASONRY_STYLES}</style>
      <Box
        ref={navRef}
        as="header"
        position="sticky"
        top={0}
        zIndex={100}
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
        boxShadow="sm"
      >
        <Container maxW="container.xl">
          <Flex py={3} align="center" gap={3}>
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Menu"
              variant="ghost"
              color="gray.700"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              borderRadius="full"
              flexShrink={0}
              _hover={{ bg: "gray.100" }}
            />
            <Text
              fontWeight="extrabold"
              fontSize={{ base: "md", md: "lg" }}
              color="gray.900"
              letterSpacing="tight"
              cursor="pointer"
              flexShrink={0}
              as="a"
              href="#"
            >
              ProjectNabil
            </Text>
            <InputGroup
              flexShrink={0}
              w={{ base: "auto", md: "260px" }}
              flex={{ base: 1, md: "none" }}
            >
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" boxSize={4} />
              </InputLeftElement>
              <Input
                placeholder="Cari karya..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                bg="gray.100"
                border="none"
                borderRadius="full"
                fontSize="sm"
                _focus={{ bg: "gray.200", outline: "none", boxShadow: "none" }}
                _placeholder={{ color: "gray.400" }}
              />
            </InputGroup>
            <Box
              display={{ base: "none", md: "flex" }}
              flex={1}
              minW={0}
              overflowX="auto"
              sx={{
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                cursor: "grab",
                "&:active": { cursor: "grabbing" },
              }}
              onMouseDown={(e) => {
                const el = e.currentTarget;
                el.dataset.isDown = "true";
                el.dataset.startX = e.pageX - el.offsetLeft;
                el.dataset.scrollLeft = el.scrollLeft;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.dataset.isDown = "false";
              }}
              onMouseUp={(e) => {
                e.currentTarget.dataset.isDown = "false";
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                if (el.dataset.isDown !== "true") return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = x - parseFloat(el.dataset.startX);
                el.scrollLeft = parseFloat(el.dataset.scrollLeft) - walk;
              }}
            >
              <HStack spacing={0} minW="max-content">
                {SECTIONS.map((s) => (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="medium"
                    color="gray.600"
                    whiteSpace="nowrap"
                    flexShrink={0}
                    _hover={{
                      bg: "gray.100",
                      color: "gray.900",
                      textDecoration: "none",
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </HStack>
            </Box>
            <Link
              as={RouterLink}
              to="/about"
              display={{ base: "none", md: "flex" }}
              alignItems="center"
              gap={1}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
              color="gray.500"
              whiteSpace="nowrap"
              flexShrink={0}
              _hover={{
                bg: "gray.100",
                color: "gray.900",
                textDecoration: "none",
              }}
            >
              <FaUser size={11} />
              About
            </Link>
          </Flex>
        </Container>
      </Box>

      <NavDrawer isOpen={isOpen} onClose={onClose} sections={SECTIONS} />

      <Container
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        {!hasAnyResult ? (
          <VStack my="auto" py={24} spacing={3} color="gray.400">
            <Text fontSize="4xl">🔍</Text>
            <Text fontWeight="medium">Tidak ada hasil untuk "{query}"</Text>
            <Button
              size="sm"
              variant="ghost"
              color="gray.500"
              onClick={() => setQuery("")}
              borderRadius="full"
            >
              Reset pencarian
            </Button>
          </VStack>
        ) : (
          SECTIONS.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              query={query}
              navHeight={navHeight}
            />
          ))
        )}
      </Container>

      <Box
        as="footer"
        borderTop="1px solid"
        borderColor="gray.200"
        bg="white"
        py={5}
        textAlign="center"
        mt="auto"
      >
        <Text fontSize="sm" color="gray.400">
          © {new Date().getFullYear()} ProjectNabil · All rights reserved
        </Text>
      </Box>
    </Stack>
  );
}

export default App;
