<?php

namespace LibraryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Copy
 *
 * @ORM\Table(name="copy")
 * @ORM\Entity(repositoryClass="LibraryBundle\Repository\CopyRepository")
 */
class Copy implements \JsonSerializable 
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \stdClass
     * @ORM\ManyToOne(targetEntity="Book")
     * @ORM\JoinColumn(name="fk_book", referencedColumnName="id")
     */
    private $book;

    /**
     * @var \stdClass
     * @ORM\ManyToOne(targetEntity="State")
     * @ORM\JoinColumn(name="fk_state", referencedColumnName="id")
     */
    private $state;

    /**
     * @var \stdClass
     * @ORM\ManyToOne(targetEntity="Status")
     * @ORM\JoinColumn(name="fk_status", referencedColumnName="id")
     */
    private $status;

    /**
     * @var string
     *
     * @ORM\Column(name="price", type="decimal", precision=5, scale=2)
     */
    private $price;

    /**
     * Get id
     *
     * @return int
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set book
     *
     * @param \stdClass $book
     *
     * @return Copy
     */
    public function setBook($book) {
        $this->book = $book;

        return $this;
    }

    /**
     * Get book
     *
     * @return \stdClass
     */
    public function getBook() {
        return $this->book;
    }

    /**
     * Set state
     *
     * @param \stdClass $state
     *
     * @return Copy
     */
    public function setState($state) {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return \stdClass
     */
    public function getState() {
        return $this->state;
    }

    /**
     * Set status
     *
     * @param \stdClass $status
     *
     * @return Copy
     */
    public function setStatus($status) {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return \stdClass
     */
    public function getStatus() {
        return $this->status;
    }

    /**
     * Set price
     *
     * @param string $price
     *
     * @return Copy
     */
    public function setPrice($price) {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return string
     */
    public function getPrice() {
        return $this->price;
    }

    public function jsonSerialize() {
        return array(
            "id" => $this->id,
            "bookId" => $this->book,
            "state" => $this->state,
            "status" => $this->status,
            "price" => $this->price
        );
    }

}
